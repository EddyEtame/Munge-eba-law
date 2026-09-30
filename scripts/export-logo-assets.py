"""Export proportional web assets from the client-supplied square logo.

The source has a near-white background. We remove only near-white neutral pixels,
preserve the original 1254 x 1254 geometry, and resize uniformly on square
canvases. This avoids the non-uniform scaling that distorted earlier exports.
"""

from pathlib import Path

import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "brand"
SOURCE = BRAND / "munge-eba-logo-original.png"


def transparent_source() -> Image.Image:
    source = Image.open(SOURCE).convert("RGB")
    rgb = np.asarray(source, dtype=np.float32)
    darkest = rgb.min(axis=2)
    lightest = rgb.max(axis=2)
    darkness = 255.0 - darkest
    chroma = lightest - darkest

    # Neutral white is background; coloured gold detail remains opaque. The
    # graduated edge retains the supplied drop shadow without a hard cut-out.
    signal = np.maximum(darkness, chroma * 1.35)
    alpha = np.clip((signal - 3.0) / 42.0, 0.0, 1.0)
    alpha = np.where((darkest > 247.0) & (chroma < 6.0), 0.0, alpha)

    # Remove the white matte from partially transparent edge pixels.
    safe_alpha = np.maximum(alpha[..., None], 1.0 / 255.0)
    foreground = (rgb - 255.0 * (1.0 - safe_alpha)) / safe_alpha
    foreground = np.clip(foreground, 0.0, 255.0)
    foreground[alpha < (1.0 / 255.0)] = 0.0

    rgba = np.dstack((foreground.astype(np.uint8), np.round(alpha * 255.0).astype(np.uint8)))
    return Image.fromarray(rgba)


def resize_square(image: Image.Image, size: int) -> Image.Image:
    return image.resize((size, size), Image.Resampling.LANCZOS)


def main() -> None:
    logo = transparent_source()
    logo.save(BRAND / "munge-eba-logo-transparent.png", optimize=True)

    for size in (256, 512, 1024):
        resize_square(logo, size).save(
            BRAND / f"munge-eba-logo-{size}.webp",
            "WEBP",
            quality=92,
            method=6,
        )

    for size in (64, 192, 512):
        resize_square(logo, size).save(
            BRAND / f"munge-eba-logo-{size}.png",
            "PNG",
            optimize=True,
        )


if __name__ == "__main__":
    main()
