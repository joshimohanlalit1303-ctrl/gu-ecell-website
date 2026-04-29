import re

with open('/Users/lalit/Desktop/ecell/index.html', 'r') as f:
    html = f.read()

# Extract body content between <body> and <script src="scene.js">
body_match = re.search(r'<body>(.*?)<script src="scene.js">', html, re.DOTALL)
if body_match:
    content = body_match.group(1)
else:
    content = ""

# Basic JSX conversion
content = content.replace('class="', 'className="')
content = content.replace('<!--', '{/*')
content = content.replace('-->', '*/}')
content = re.sub(r'style="([^"]+)"', lambda m: 'style={{' + ', '.join([f"'{k.strip()}': '{v.strip()}'" for k, v in [x.split(':') for x in m.group(1).split(';') if ':' in x]]) + '}}', content)

# Convert inline styles properly like transition-delay to transitionDelay
def camel_case(match):
    parts = match.group(1).split('-')
    res = parts[0] + ''.join(x.title() for x in parts[1:])
    return f"'{res}'"

content = re.sub(r"'([a-z]+-[a-z]+)'\s*:", camel_case, content)

template = f"""import React, {{ useEffect }} from 'react';
import './Antigravity.css';

export default function Antigravity() {{
  useEffect(() => {{
    // Add logic later
  }}, []);

  return (
    <div className="antigravity-page">
      {{/* Fonts and Icons */}}
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <script src="https://unpkg.com/@phosphor-icons/web"></script>
      
      {content}
    </div>
  );
}}
"""

with open('/Users/lalit/Desktop/ecell2/src/pages/Antigravity/Antigravity.jsx', 'w') as f:
    f.write(template)

print("Converted HTML to JSX")
