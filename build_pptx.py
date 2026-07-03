"""Build the VFS | Audit Remediations executive slide as a native .pptx.

Run:  python build_pptx.py
Output: vfs-audit-remediations-exec.pptx (16:9, editable, native charts).
"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.chart.data import CategoryChartData
from pptx.enum.chart import (
    XL_CHART_TYPE, XL_LEGEND_POSITION, XL_LABEL_POSITION, XL_MARKER_STYLE,
)
from lxml import etree


# --- Brand palette ---------------------------------------------------------
VF_RED = RGBColor(0xE6, 0x00, 0x00)
VF_RED_DARK = RGBColor(0xB3, 0x00, 0x00)
INK = RGBColor(0x0B, 0x1F, 0x3A)
INK_2 = RGBColor(0x33, 0x47, 0x5B)
MUTED = RGBColor(0x6B, 0x7A, 0x8F)
LINE = RGBColor(0xE6, 0xEA, 0xF0)
CARD = RGBColor(0xFF, 0xFF, 0xFF)
BG = RGBColor(0xF5, 0xF7, 0xFB)
GOOD = RGBColor(0x16, 0xA3, 0x4A)
AMBER = RGBColor(0xF5, 0x9E, 0x0B)
INFO = RGBColor(0x25, 0x63, 0xEB)

DONUT_COLORS = [
    RGBColor(0xE6, 0x00, 0x00),
    RGBColor(0xB3, 0x00, 0x00),
    RGBColor(0xF5, 0x9E, 0x0B),
    RGBColor(0x25, 0x63, 0xEB),
    RGBColor(0x0E, 0xA5, 0xE9),
    RGBColor(0x7C, 0x3A, 0xED),
    RGBColor(0x16, 0xA3, 0x4A),
    RGBColor(0x64, 0x74, 0x8B),
]

# --- Helpers ---------------------------------------------------------------


def set_fill(shape, rgb):
    shape.fill.solid()
    shape.fill.fore_color.rgb = rgb


def set_no_line(shape):
    shape.line.fill.background()


def set_line(shape, rgb, width_pt=0.75):
    shape.line.color.rgb = rgb
    shape.line.width = Pt(width_pt)


def add_text(slide, x, y, w, h, text, *,
             size=12, bold=False, color=INK, align=PP_ALIGN.LEFT,
             anchor=MSO_ANCHOR.TOP, font="Calibri"):
    tb = slide.shapes.add_textbox(x, y, w, h)
    tf = tb.text_frame
    tf.margin_left = Emu(0)
    tf.margin_right = Emu(0)
    tf.margin_top = Emu(0)
    tf.margin_bottom = Emu(0)
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.name = font
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    return tb


def add_card(slide, x, y, w, h, *, accent_color=None):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h)
    card.adjustments[0] = 0.06
    set_fill(card, CARD)
    set_line(card, LINE, 0.75)
    if accent_color is not None:
        # Thin accent bar across the top of the card
        bar_h = Emu(45720)  # ~0.05 inch
        bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, w, bar_h)
        set_fill(bar, accent_color)
        set_no_line(bar)
    return card


def add_kpi(slide, x, y, w, h, *, label, value, unit=None, foot, accent):
    add_card(slide, x, y, w, h, accent_color=accent)
    # Label
    add_text(slide, x + Inches(0.18), y + Inches(0.14),
             w - Inches(0.36), Inches(0.28),
             text=label.upper(), size=9, bold=True, color=MUTED)
    # Value
    val_tb = slide.shapes.add_textbox(x + Inches(0.18), y + Inches(0.42),
                                      w - Inches(0.36), Inches(0.9))
    val_tb.text_frame.margin_left = Emu(0)
    val_tb.text_frame.margin_right = Emu(0)
    val_tb.text_frame.word_wrap = True
    p = val_tb.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.LEFT
    r = p.add_run()
    r.text = str(value)
    r.font.name = "Calibri"
    r.font.size = Pt(40)
    r.font.bold = True
    r.font.color.rgb = INK
    if unit:
        r2 = p.add_run()
        r2.text = unit
        r2.font.name = "Calibri"
        r2.font.size = Pt(20)
        r2.font.bold = True
        r2.font.color.rgb = MUTED
    # Footer
    add_text(slide, x + Inches(0.18), y + h - Inches(0.42),
             w - Inches(0.36), Inches(0.32),
             text=foot, size=9, color=INK_2)


def add_callout(slide, x, y, w, h, *, title, body, accent):
    add_card(slide, x, y, w, h)
    # Left accent bar
    bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, Emu(45720), h)
    set_fill(bar, accent)
    set_no_line(bar)
    add_text(slide, x + Inches(0.18), y + Inches(0.12),
             w - Inches(0.36), Inches(0.28),
             text=title.upper(), size=9, bold=True, color=accent)
    add_text(slide, x + Inches(0.18), y + Inches(0.42),
             w - Inches(0.36), h - Inches(0.5),
             text=body, size=10, color=INK_2)


_LEGEND_POS_MAP = {
    XL_LEGEND_POSITION.BOTTOM: "b",
    XL_LEGEND_POSITION.TOP: "t",
    XL_LEGEND_POSITION.LEFT: "l",
    XL_LEGEND_POSITION.RIGHT: "r",
    XL_LEGEND_POSITION.CORNER: "tr",
}
_C_NS = "http://schemas.openxmlformats.org/drawingml/2006/chart"


def _force_legend_pos(chart, pos):
    """Guarantee <c:legendPos val="..."/> is present with a valid value.

    Works around a python-pptx quirk where setting `chart.legend.position`
    combined with `include_in_layout=False` can emit `<c:legendPos/>` with
    no `val` attribute, which Microsoft PowerPoint rejects.
    """
    legend_el = chart.legend._element  # <c:legend>
    lp_els = legend_el.findall(f"{{{_C_NS}}}legendPos")
    val = _LEGEND_POS_MAP.get(pos, "b")
    if lp_els:
        for el in lp_els:
            el.set("val", val)
    else:
        lp = etree.SubElement(legend_el, f"{{{_C_NS}}}legendPos")
        lp.set("val", val)
        # legendPos must be the first child of <c:legend>
        legend_el.insert(0, lp)


def style_chart(chart, *, has_legend=True, legend_pos=XL_LEGEND_POSITION.BOTTOM):
    chart.has_title = False
    if has_legend:
        chart.has_legend = True
        chart.legend.position = legend_pos
        chart.legend.font.size = Pt(9)
        chart.legend.font.name = "Calibri"
        _force_legend_pos(chart, legend_pos)
    else:
        chart.has_legend = False


# --- Build presentation ----------------------------------------------------


def build():
    prs = Presentation()
    prs.slide_width = Inches(13.333)   # 16:9 widescreen
    prs.slide_height = Inches(7.5)

    slide = prs.slides.add_slide(prs.slide_layouts[6])  # blank
    # Background
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0,
                                prs.slide_width, prs.slide_height)
    set_fill(bg, BG)
    set_no_line(bg)

    # Top brand accent bar
    top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0,
                                     prs.slide_width, Emu(45720))
    set_fill(top_bar, VF_RED)
    set_no_line(top_bar)

    # ----- Header ---------------------------------------------------------
    header_y = Inches(0.28)
    # "VFS" in red
    vfs_tb = slide.shapes.add_textbox(Inches(0.5), header_y,
                                      Inches(1.4), Inches(0.6))
    vfs_tf = vfs_tb.text_frame
    vfs_tf.margin_left = Emu(0)
    vfs_tf.margin_right = Emu(0)
    p = vfs_tf.paragraphs[0]
    r = p.add_run(); r.text = "VFS"
    r.font.name = "Calibri"; r.font.size = Pt(28); r.font.bold = True
    r.font.color.rgb = VF_RED

    # Title
    add_text(slide, Inches(1.5), header_y, Inches(7), Inches(0.6),
             text="| Audit Remediations", size=28, bold=True, color=INK)

    # Subtitle right
    add_text(slide, Inches(8.0), header_y + Inches(0.12),
             Inches(5.0), Inches(0.4),
             text="FY26 CLOSE-OUT & FY27 OUTLOOK  ·  EXECUTIVE SUMMARY",
             size=10, bold=True, color=MUTED, align=PP_ALIGN.RIGHT)

    # Header divider
    div = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.5), Inches(0.95),
                                 Inches(12.33), Emu(9525))
    set_fill(div, LINE)
    set_no_line(div)

    # ----- KPI Row --------------------------------------------------------
    kpi_y = Inches(1.1)
    kpi_h = Inches(1.35)
    left = Inches(0.5)
    total_w = Inches(12.33)
    gap = Inches(0.12)
    kpi_count = 5
    kpi_w = (total_w - gap * (kpi_count - 1)) / kpi_count

    kpis = [
        ("Completion Rate", "100", "%",
         "FY26 formally closed", GOOD),
        ("Total Remediations Closed", "25", None,
         "18 FY26  +  7 FY27 Q1", VF_RED),
        ("Open Items", "0", None,
         "No items carried forward", INK),
        ("FY26 Audits Delivered", "7", None,
         "1 FY26 audit still in progress", INFO),
        ("FY27 Q1 Audits Planned", "4", None,
         "1 currently in progress", AMBER),
    ]

    for i, (label, value, unit, foot, accent) in enumerate(kpis):
        x = left + (kpi_w + gap) * i
        add_kpi(slide, x, kpi_y, kpi_w, kpi_h,
                label=label, value=value, unit=unit, foot=foot, accent=accent)

    # ----- Chart panels ---------------------------------------------------
    body_y = kpi_y + kpi_h + Inches(0.15)
    body_h = Inches(3.3)
    panel_gap = Inches(0.15)
    panel_count = 3
    panel_w = (total_w - panel_gap * (panel_count - 1)) / panel_count

    # Panel backgrounds (cards)
    for i in range(panel_count):
        px = left + (panel_w + panel_gap) * i
        add_card(slide, px, body_y, panel_w, body_h)

    # Panel titles
    panel_titles = [
        ("Remediation Burndown",
         "Open vs. cumulative Closed across FY26 -> FY27 Q1"),
        ("Closed Remediations by Parent Audit",
         "25 items across 8 audit streams"),
        ("FY26 vs FY27 Q1 Delivery",
         "Planned vs. completed remediation actions"),
    ]
    for i, (t, h) in enumerate(panel_titles):
        px = left + (panel_w + panel_gap) * i
        add_text(slide, px + Inches(0.2), body_y + Inches(0.12),
                 panel_w - Inches(0.4), Inches(0.3),
                 text=t, size=13, bold=True, color=INK)
        add_text(slide, px + Inches(0.2), body_y + Inches(0.42),
                 panel_w - Inches(0.4), Inches(0.28),
                 text=h, size=9, color=MUTED)

    chart_top = body_y + Inches(0.8)
    chart_h = body_h - Inches(0.95)

    # --- 1) Burndown line chart ---
    burndown_data = CategoryChartData()
    burndown_data.categories = ["FY26 Q1", "FY26 Q2", "FY26 Q3", "FY26 Q4", "FY27 Q1"]
    burndown_data.add_series("Open", (18, 10, 6, 3, 7))
    burndown_data.add_series("Closed (cumulative)", (0, 8, 14, 17, 25))
    bd_x = left + Inches(0.15)
    chart_shape = slide.shapes.add_chart(
        XL_CHART_TYPE.LINE, bd_x, chart_top,
        panel_w - Inches(0.3), chart_h, burndown_data
    )
    burndown_chart = chart_shape.chart
    style_chart(burndown_chart)
    # Style series colors and markers
    series_list = list(burndown_chart.series)
    open_series = series_list[0]
    open_series.format.line.color.rgb = VF_RED
    open_series.format.line.width = Pt(2.5)
    open_series.marker.style = XL_MARKER_STYLE.CIRCLE
    open_series.marker.size = 7
    open_series.marker.format.fill.solid()
    open_series.marker.format.fill.fore_color.rgb = VF_RED

    closed_series = series_list[1]
    closed_series.format.line.color.rgb = GOOD
    closed_series.format.line.width = Pt(2.5)
    closed_series.marker.style = XL_MARKER_STYLE.CIRCLE
    closed_series.marker.size = 7
    closed_series.marker.format.fill.solid()
    closed_series.marker.format.fill.fore_color.rgb = GOOD

    # --- 2) Doughnut chart ---
    donut_data = CategoryChartData()
    donut_data.categories = [
        "FY26 Vodacom Insurance",
        "FY26 Vodacom Life Assurance",
        "FY26 Consumer Lending",
        "FY25 Vodacom Insurance (VIC)",
        "FY25 Data Protection",
        "FY25 DevSecOps",
        "FY25 Ransomware Recovery",
        "FY25 Vodapay Products",
    ]
    donut_data.add_series("Closed", (7, 6, 3, 3, 2, 2, 1, 1))
    dn_x = left + panel_w + panel_gap + Inches(0.15)
    donut_shape = slide.shapes.add_chart(
        XL_CHART_TYPE.DOUGHNUT, dn_x, chart_top,
        panel_w - Inches(0.3), chart_h, donut_data
    )
    donut_chart = donut_shape.chart
    # Use BOTTOM legend for reliability across PowerPoint versions
    style_chart(donut_chart, legend_pos=XL_LEGEND_POSITION.BOTTOM)
    # Data labels — show slice values (no custom font color for max compat)
    plot = donut_chart.plots[0]
    plot.has_data_labels = True
    dl = plot.data_labels
    dl.font.size = Pt(9)
    dl.font.bold = True
    dl.show_value = True

    # Color each slice
    series0 = list(donut_chart.series)[0]
    for idx, pt in enumerate(series0.points):
        pt.format.fill.solid()
        pt.format.fill.fore_color.rgb = DONUT_COLORS[idx % len(DONUT_COLORS)]
        pt.format.line.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        pt.format.line.width = Pt(1.5)

    # --- 3) Grouped bar (clustered column) chart ---
    bar_data = CategoryChartData()
    bar_data.categories = ["Audits", "Remediations", "Completed", "Open"]
    bar_data.add_series("FY26", (7, 18, 18, 0))
    bar_data.add_series("FY27 Q1", (4, 7, 7, 0))
    br_x = left + (panel_w + panel_gap) * 2 + Inches(0.15)
    bar_shape = slide.shapes.add_chart(
        XL_CHART_TYPE.COLUMN_CLUSTERED, br_x, chart_top,
        panel_w - Inches(0.3), chart_h, bar_data
    )
    bar_chart = bar_shape.chart
    style_chart(bar_chart)
    bar_series = list(bar_chart.series)
    bar_series[0].format.fill.solid()
    bar_series[0].format.fill.fore_color.rgb = VF_RED
    bar_series[0].format.line.fill.background()
    bar_series[1].format.fill.solid()
    bar_series[1].format.fill.fore_color.rgb = INFO
    bar_series[1].format.line.fill.background()
    # Value labels above bars
    for s in bar_series:
        s.data_labels.show_value = True
        s.data_labels.font.size = Pt(9)
        s.data_labels.font.color.rgb = INK
        s.data_labels.position = XL_LABEL_POSITION.OUTSIDE_END

    # ----- Callouts (footer) ---------------------------------------------
    call_y = body_y + body_h + Inches(0.15)
    call_h = prs.slide_height - call_y - Inches(0.3)
    call_count = 4
    call_w = (total_w - gap * (call_count - 1)) / call_count

    callouts = [
        ("FY26 Closed",
         "All 18 remediation actions delivered — 100% completion, zero carry-forward items.",
         GOOD),
        ("FY26 In Progress",
         "One FY26 audit remains in progress; findings will be reported on completion.",
         INFO),
        ("FY27 Programme",
         "Four FY27 Q1 audits planned; one active. Remediations tracked under FY27 programme.",
         AMBER),
        ("Capacity Note",
         "Management actions factored into PI capacity and delivered within PI quarters.",
         VF_RED),
    ]
    for i, (t, b, a) in enumerate(callouts):
        cx = left + (call_w + gap) * i
        add_callout(slide, cx, call_y, call_w, call_h, title=t, body=b, accent=a)

    out = "vfs-audit-remediations-exec.pptx"
    prs.save(out)
    print(f"Wrote {out}")


if __name__ == "__main__":
    build()
