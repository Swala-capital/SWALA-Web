import re

def separate_assets():
    with open('index.html', 'r') as f:
        content = f.read()

    # Extract CSS
    css_blocks = re.findall(r'<style>(.*?)</style>', content, re.DOTALL)
    full_css = "\n".join(css_blocks)
    
    with open('styles.css', 'w') as f:
        f.write(full_css)

    # Extract JS
    js_blocks = re.findall(r'<script>(.*?)</script>', content, re.DOTALL)
    full_js = "\n".join(js_blocks)
    
    with open('script.js', 'w') as f:
        f.write(full_js)

    # Remove style and script tags and replace with links
    new_html = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)
    new_html = re.sub(r'<script>.*?</script>', '', new_html, flags=re.DOTALL)
    
    # Add links in head
    head_end = new_html.find('</head>')
    css_link = '\n<link rel="stylesheet" href="styles.css">\n'
    new_html = new_html[:head_end] + css_link + new_html[head_end:]
    
    # Add script at end of body
    body_end = new_html.find('</body>')
    js_link = '\n<script src="script.js"></script>\n'
    new_html = new_html[:body_end] + js_link + new_html[body_end:]

    with open('index.html', 'w') as f:
        f.write(new_html)

    print("CSS and JS separated into styles.css and script.js")

if __name__ == "__main__":
    separate_assets()
