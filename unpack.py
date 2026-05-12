import json
import base64
import os
import re

def unpack():
    html_path = 'index.html'
    with open(html_path, 'r') as f:
        content = f.read()

    # Extract Manifest
    manifest_match = re.search(r'<script type="__bundler/manifest">(.*?)</script>', content, re.DOTALL)
    if not manifest_match:
        print("Manifest not found")
        return

    manifest = json.loads(manifest_match.group(1))

    # Extract Template
    template_match = re.search(r'<script type="__bundler/template">(.*?)</script>', content, re.DOTALL)
    if not template_match:
        print("Template not found")
        return

    template = json.loads(template_match.group(1))

    # Create assets dir
    if not os.path.exists('assets'):
        os.makedirs('assets')

    # Unpack assets
    asset_map = {}
    for uuid, entry in manifest.items():
        data = base64.b64decode(entry['data'])
        mime = entry['mime']
        ext = mime.split('/')[-1].split('+')[0] # naive extension
        if 'woff2' in mime: ext = 'woff2'
        if 'svg' in mime: ext = 'svg'
        if 'png' in mime: ext = 'png'
        if 'jpeg' in mime or 'jpg' in mime: ext = 'jpg'
        
        filename = f"{uuid}.{ext}"
        filepath = os.path.join('assets', filename)
        
        with open(filepath, 'wb') as f:
            f.write(data)
        
        asset_map[uuid] = filepath

    # Replace UUIDs in template
    final_html = template
    for uuid, path in asset_map.items():
        final_html = final_html.replace(uuid, path)

    # Clean up integrity and crossorigin attributes that might break local/raw loading
    final_html = re.sub(r'\s+integrity="[^"]*"', '', final_html)
    final_html = re.sub(r'\s+crossorigin="[^"]*"', '', final_html)

    # Write new index.html
    with open('index_new.html', 'w') as f:
        f.write(final_html)

    print("Unpacking complete. Assets saved to assets/. New HTML in index_new.html")

if __name__ == "__main__":
    unpack()
