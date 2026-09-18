#!/usr/bin/env python3
"""Generate apps/docs/public/og-image.png (1200x630 Open Graph image).

Renders the homepage hero lockup (logo + headline + description) with PIL,
matching the site's typography: SF Pro (ui-sans-serif), SF Mono (font-mono),
semibold heading with tracking-tight (-0.025em letter-spacing).

Layout is optically balanced: gaps are weighted by element mass rather than
uniform, and the text block fills the canvas width.

Usage: python3 apps/docs/scripts/generate-og-image.py
Requires: Pillow. Fonts: SF Pro / SF Mono (macOS system fonts).
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og-image.png"

W, H = 1200, 630

BG = (6, 10, 14)
TEXT = (239, 242, 245)
ACCENT = (20, 196, 255)
MUTED = (134, 144, 155)

FONT_SANS = "/System/Library/Fonts/SFNS.ttf"
FONT_MONO = "/System/Library/Fonts/SFNSMono.ttf"

# --- layout constants -------------------------------------------------------
MARGIN_X = 192  # wide side margins keep content inside squarer social crops
MARGIN_TOP = 84

WORDMARK_SIZE = 36

HEADLINE_SIZE = 91
HEADLINE_LEADING = 1.25  # leading-tight
DESC_SIZE = 28
DESC_LEADING = 1.625  # leading-relaxed

TRACKING_TIGHT = -0.025  # em, matches Tailwind tracking-tight

# Optical gaps (clear space between visual bounding boxes), weighted by
# element mass: the light logo row gets more air before the heavy headline;
# the description hugs the headline it belongs to.
GAP_LOGO_H1 = 72
GAP_H1_DESC = 40


def sans(size: int, instance: str = "Regular") -> ImageFont.FreeTypeFont:
    font = ImageFont.truetype(FONT_SANS, size)
    font.set_variation_by_name(instance)
    return font


def mono(size: int, instance: str = "Semibold") -> ImageFont.FreeTypeFont:
    font = ImageFont.truetype(FONT_MONO, size)
    font.set_variation_by_name(instance)
    return font


def tracked_width(draw, text, font, tracking: float) -> float:
    """Width of text with per-character letter-spacing (CSS letter-spacing)."""
    if not text:
        return 0.0
    adv = sum(draw.textlength(ch, font=font) for ch in text)
    return adv + tracking * (len(text) - 1)


def draw_tracked(
    draw,
    xy: tuple[float, float],
    parts: list[tuple[str, tuple[int, int, int]]],
    font,
    tracking: float,
) -> None:
    """Draw a line with per-segment colors and per-character letter-spacing."""
    x, y = xy
    for i, (text, color) in enumerate(parts):
        for j, ch in enumerate(text):
            draw.text((x, y), ch, font=font, fill=color)
            x += draw.textlength(ch, font=font)
            # letter-spacing applies after every glyph except the line's last
            if not (i == len(parts) - 1 and j == len(text) - 1):
                x += tracking


def ink_height(draw, text, font) -> tuple[int, int]:
    """(height, top_offset) of the rendered ink for a line of text."""
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[3] - bbox[1], bbox[1]


def main() -> None:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    wordmark_font = mono(WORDMARK_SIZE)
    h1 = sans(HEADLINE_SIZE, "Semibold")
    desc = sans(DESC_SIZE)

    h1_track = HEADLINE_SIZE * TRACKING_TIGHT
    wm_track = WORDMARK_SIZE * TRACKING_TIGHT

    y = MARGIN_TOP

    # -- logo row: wordmark only -----------------------------------------------
    wm = [("ionbit", TEXT), ("_ui", ACCENT)]
    wm_w = tracked_width(draw, "ionbit_ui", wordmark_font, wm_track)
    wb = draw.textbbox((0, 0), "ionbit_ui", font=wordmark_font)
    draw_tracked(draw, (MARGIN_X, y), wm, wordmark_font, wm_track)
    logo_right = MARGIN_X + wm_w

    logo_bottom = y + wb[3]

    # -- headline --------------------------------------------------------------
    # GAP_LOGO_H1 is clear space between the wordmark's baseline and the top
    # of the headline's ink.
    h1_lines = [
        [("Production interfaces", TEXT)],
        [("that feel ", TEXT), ("alive", ACCENT)],
    ]
    ink_h, ink_top = ink_height(draw, "Production interfaces", h1)
    h1_y = logo_bottom + GAP_LOGO_H1 - ink_top

    advance = round(HEADLINE_SIZE * HEADLINE_LEADING)
    for i, parts in enumerate(h1_lines):
        draw_tracked(draw, (MARGIN_X, h1_y + i * advance), parts, h1, h1_track)

    h1_ink_bottom = h1_y + advance + ink_top + ink_h

    # -- description -------------------------------------------------------------
    desc_text = (
        "A React component system with a coherent motion layer and a "
        "restrained digital identity. Source-owned, accessible, and "
        "production-tested."
    )
    # Wrap the description at the headline's width so both blocks share a
    # right boundary.
    max_desc_w = tracked_width(
        draw, "Production interfaces", h1, h1_track
    )
    words = desc_text.split()
    lines, cur = [], ""
    for word in words:
        trial = f"{cur} {word}".strip()
        if draw.textlength(trial, font=desc) <= max_desc_w:
            cur = trial
        else:
            lines.append(cur)
            cur = word
    lines.append(cur)

    d_ink_h, d_ink_top = ink_height(draw, lines[0], desc)
    desc_y = h1_ink_bottom + GAP_H1_DESC - d_ink_top
    d_advance = round(DESC_SIZE * DESC_LEADING)
    for i, line in enumerate(lines):
        draw.text((MARGIN_X, desc_y + i * d_advance), line, font=desc, fill=MUTED)

    desc_ink_bottom = desc_y + (len(lines) - 1) * d_advance + d_ink_top + d_ink_h

    # -- report -------------------------------------------------------------------
    right_edge = max(
        tracked_width(draw, "".join(p for p, _ in h1_lines[0]), h1, h1_track),
        tracked_width(draw, "".join(p for p, _ in h1_lines[1]), h1, h1_track),
        max(draw.textlength(l, font=desc) for l in lines),
        logo_right - MARGIN_X,
    ) + MARGIN_X
    print(
        f"content: x {MARGIN_X}-{right_edge:.0f}  "
        f"y {MARGIN_TOP}-{desc_ink_bottom:.0f}"
    )
    print(
        f"margins: top {MARGIN_TOP}  right {W - right_edge:.0f}  "
        f"bottom {H - desc_ink_bottom:.0f}"
    )

    img.save(OUT)
    print(f"saved {OUT}")


if __name__ == "__main__":
    main()
