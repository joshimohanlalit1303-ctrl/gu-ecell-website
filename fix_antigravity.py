import re

with open('/Users/lalit/Desktop/ecell2/src/pages/Antigravity/Antigravity.jsx', 'r') as f:
    content = f.read()

# 1. Remove loading-screen, cursor, scroll-progress, navbar, mobile-menu
content = re.sub(r'\{/\* Loading Screen \*/\}.*?\{/\* Hero Section \*/\}', '{/* Hero Section */}', content, flags=re.DOTALL)

# 2. Remove hero-bg from hero and final-cta
content = re.sub(r'<div className="hero-bg">.*?</div>\s*</div>', '', content, flags=re.DOTALL)

# 3. Remove Footer
content = re.sub(r'\{/\* Footer \*/\}.*?</footer>', '', content, flags=re.DOTALL)

# 4. Change reveal-up to reveal, reveal-text to reveal
content = content.replace('reveal-up', 'reveal')
content = content.replace('reveal-text', 'reveal')

with open('/Users/lalit/Desktop/ecell2/src/pages/Antigravity/Antigravity.jsx', 'w') as f:
    f.write(content)

with open('/Users/lalit/Desktop/ecell2/src/pages/Antigravity/Antigravity.css', 'r') as f:
    css = f.read()

# 1. Remove :root
css = re.sub(r':root\s*\{[^}]+\}', '', css)
# 2. Remove body, *, html
css = re.sub(r'\*,\*::before.*?\}', '', css, flags=re.DOTALL)
css = re.sub(r'\*\s*\{[^}]+\}', '', css)
css = re.sub(r'html\.lenis.*?\}', '', css, flags=re.DOTALL)
css = re.sub(r'\.lenis.*?\}', '', css, flags=re.DOTALL)
css = re.sub(r'body\s*\{[^}]+\}', '', css)
css = re.sub(r'body\.hovering.*?\}', '', css, flags=re.DOTALL)
css = re.sub(r'body:hover.*?\}', '', css, flags=re.DOTALL)
css = re.sub(r'a\s*\{[^}]+\}', '', css)
css = re.sub(r'button\s*\{[^}]+\}', '', css)
css = re.sub(r'ul\s*\{[^}]+\}', '', css)

# 3. Rename CSS vars to use E-Cell vars
css = css.replace('var(--primary)', 'var(--accent)')
css = css.replace('var(--primary-glow)', 'rgba(108, 71, 255, 0.4)')
css = css.replace('var(--secondary)', 'var(--accent3)')
css = css.replace('var(--highlight)', 'var(--accent2)')
css = css.replace('var(--text-primary)', '#ffffff')
css = css.replace('var(--text-secondary)', 'var(--white70)')
css = css.replace('var(--bg-color)', 'transparent')
css = css.replace('var(--surface-color)', 'var(--glass)')
css = css.replace('var(--card-color)', 'var(--glass)')
css = css.replace('var(--border-color)', 'var(--glass-border)')
css = css.replace('var(--font-body)', 'var(--font)')
css = css.replace('var(--font-heading)', 'var(--font)')
css = css.replace('var(--font-mono)', 'var(--mono)')

with open('/Users/lalit/Desktop/ecell2/src/pages/Antigravity/Antigravity.css', 'w') as f:
    f.write(css)

print("Updated JSX and CSS")
