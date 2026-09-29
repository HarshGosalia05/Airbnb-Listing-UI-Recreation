"""Step 3: pull the stylesheet, the font and the photo-tour data out of the captures.

Usage: python tools/extract.py        (after assets.js and dump.js)

- tools/.out/site-pretty.css: the capture's <style> blocks with data URIs elided, one rule per line.
  This is the source of every value in the component specs, including hover, active, transition
  and @media rules.
- src/app/fonts/AirbnbCerealVF.woff2: the variable font embedded in the @font-face rule.
- tools/.out/tour.json: photo-tour rooms (name, amenity subtitle, rows of 1 or 2 photos with their
  global index), parsed from the dumped tour markup. It becomes TOUR_ROOMS in
  src/components/listing/data.ts.
"""
import base64
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = os.path.join(HERE, '.out')
REFS = os.path.join(ROOT, 'docs', 'design-references')

capture = sorted(f for f in os.listdir(REFS) if f.endswith('.html'))[0]
html = open(os.path.join(REFS, capture), encoding='utf8').read()

# Stylesheet
lite = re.sub(r'data:[^")]{200,}', 'DATA', html)
css = '\n'.join(re.findall(r'<style[^>]*>(.*?)</style>', lite, re.S))
css = css[css.index('@font-face'):]
open(os.path.join(OUT, 'site-pretty.css'), 'w', encoding='utf8').write(re.sub(r'\}', '}\n', css))

# Font
m = re.search(r'@font-face\{[^}]*?url\((?:&quot;|")?data:[^;]*;base64,([A-Za-z0-9+/=]+)', html)
font_dir = os.path.join(ROOT, 'src', 'app', 'fonts')
os.makedirs(font_dir, exist_ok=True)
font = base64.b64decode(m.group(1))
open(os.path.join(font_dir, 'AirbnbCerealVF.woff2'), 'wb').write(font)

# Photo-tour rooms
tour = open(os.path.join(OUT, 'sections', 'tour.html'), encoding='utf8').read()
nav = re.findall(r'<button class="_gKVFNL"[^>]*aria-label="([^"]*)">\s*<img[^>]*src="IMG:([^"]*)"', tour)
rooms = []
for sec in re.split(r'<section class="_AWcqip"', tour)[1:]:
    name = re.search(r'_AnkvRF">([^<]*)', sec).group(1)
    sub = re.search(r'_hvJgUS">([^<]*)', sec)
    rows = []
    for row in re.split(r'<div class="_wdcjGJ', sec)[1:]:
        layout = 'single' if row.startswith(' _vmCONz') else 'double'
        photos = re.findall(r'data-idx="(\d+)"[^>]*>\s*<img[^>]*src="IMG:([^"]*)"', row)
        rows.append({'layout': layout, 'photos': [{'idx': int(i), 'file': f} for i, f in photos]})
    rooms.append({'name': name, 'subtitle': sub.group(1) if sub else '', 'rows': rows})
json.dump({'nav': nav, 'rooms': rooms}, open(os.path.join(OUT, 'tour.json'), 'w', encoding='utf8'), indent=1, ensure_ascii=False)

print(f'css {len(css)} chars, font {len(font)} bytes, {len(rooms)} tour rooms')
