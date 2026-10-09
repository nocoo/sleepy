from pathlib import Path

from PIL import Image


output = Path("public/icons")
output.mkdir(parents=True, exist_ok=True)
image = Image.open("assets/brand/icon.png").convert("RGB")
for name, pixels in [("icon-192.png", 192), ("icon-512.png", 512), ("maskable-512.png", 512), ("apple-touch-icon.png", 180)]:
    image.resize((pixels, pixels), Image.Resampling.LANCZOS).save(output / name, optimize=True)
foreground = Image.open("logo.png").convert("RGBA")
foreground.resize((64, 64), Image.Resampling.LANCZOS).save("public/favicon.png")
foreground.save("public/favicon.ico", sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64)])
foreground.resize((80, 80), Image.Resampling.LANCZOS).save("public/logo-80.png")
print("PWA tiles and transparent application/browser marks generated from approved masters.")
