"""Pixel-diff the clone's QA screenshots against the reference renders.

Usage: python tools/diff.py [tag]      (after `node tools/qa.js [tag]`)

For each pair it prints both image sizes, the number of pixels whose difference exceeds a small
threshold, and every 200px horizontal band that contains notable differences, so regressions can
be located section by section. A diff mask is written next to the screenshots.
"""
import os
import sys

from PIL import Image, ImageChops

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '.out')
REF = os.path.join(os.path.dirname(HERE), 'docs', 'design-references', 'sections')
tag = sys.argv[1] if len(sys.argv) > 1 else 'clone'

PAIRS = [('full-1440.png', f'{tag}-1440.png'), ('full-390.png', f'{tag}-390.png'), ('tour-1440.png', f'{tag}-tour.png')]

for ref_name, clone_name in PAIRS:
    a = Image.open(os.path.join(REF, ref_name)).convert('RGB')
    b = Image.open(os.path.join(OUT, clone_name)).convert('RGB')
    h, w = min(a.height, b.height), min(a.width, b.width)
    mask = ImageChops.difference(a.crop((0, 0, w, h)), b.crop((0, 0, w, h))).convert('L').point(lambda v: 255 if v > 40 else 0)
    total = mask.histogram()[255]
    print(f'{ref_name}: reference {a.size} clone {b.size} differing px {total}')
    for y in range(0, h, 200):
        band = mask.crop((0, y, w, y + 200))
        n = band.histogram()[255]
        if n > 300:
            print(f'  y={y:5d} px={n:6d} bbox={band.getbbox()}')
    mask.save(os.path.join(OUT, f'{tag}-diff-{ref_name}'))
