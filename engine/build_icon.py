# Generate the PWA / notification icons (icon-192.png, icon-512.png) in the repo root.
# Pixel-art compass/target on the app's dark palette — drawn on a 16x16 grid then
# upscaled with NEAREST so it stays crisp, matching the dashboard's pixelated look.
import os
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BG, LINE, GOLD, EXP, INK = (12, 15, 24), (29, 37, 54), (246, 197, 82), (95, 208, 224), (205, 216, 242)

g = Image.new('RGB', (16, 16), BG)
d = ImageDraw.Draw(g)
d.rounded_rectangle([0, 0, 15, 15], radius=3, outline=LINE)
# compass diamond (the "co-pilot" needle) in gold, EXP-teal center pixel
diamond = [(8, 3), (12, 8), (8, 13), (4, 8)]
d.polygon(diamond, outline=GOLD)
d.polygon([(8, 5), (10, 8), (8, 11), (6, 8)], fill=GOLD)
d.point((8, 8), fill=EXP)
# tick marks N/E/S/W
for p in [(8, 1), (14, 8), (8, 14), (2, 8)]:
    d.point(p, fill=INK)

for size in (192, 512):
    g.resize((size, size), Image.NEAREST).save(os.path.join(ROOT, f'icon-{size}.png'))
    print(f'wrote icon-{size}.png')
