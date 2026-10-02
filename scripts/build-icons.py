from pathlib import Path

from PIL import Image, ImageDraw


output = Path("public/icons")
output.mkdir(parents=True, exist_ok=True)
scale = 4
size = 512 * scale
image = Image.new("RGB", (size, size), "#233d37")
draw = ImageDraw.Draw(image)
draw.ellipse((116 * scale, 104 * scale, 370 * scale, 358 * scale), fill="#e8dbb6")
draw.ellipse((181 * scale, 70 * scale, 395 * scale, 284 * scale), fill="#233d37")
draw.ellipse((353 * scale, 129 * scale, 371 * scale, 147 * scale), fill="#e8dbb6")
draw.arc((117 * scale, 355 * scale, 389 * scale, 404 * scale), 185, 344, fill="#a4b597", width=3 * scale)
for name, pixels in [("icon-192.png", 192), ("icon-512.png", 512), ("maskable-512.png", 512), ("apple-touch-icon.png", 180)]:
    image.resize((pixels, pixels), Image.Resampling.LANCZOS).save(output / name, optimize=True)
print("PWA icons generated from original geometric artwork.")
