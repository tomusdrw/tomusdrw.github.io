# Light/Dark Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add light/dark theme switching with system preference auto-detection, localStorage persistence, and a header toggle button. Light theme is an "inverted terminal" aesthetic.

**Architecture:** CSS custom properties on `:root` (dark default) overridden by `[data-theme="light"]` on `<html>`. Inline script in `<head>` prevents flash. Toggle button in header.

**Tech Stack:** Astro v5, Sass (SCSS), CSS custom properties, Shiki dual themes

---

### Task 1: Define CSS Custom Properties in _variables.scss

**Files:**
- Modify: `src/styles/_sass/_variables.scss`

- [ ] **Step 1: Replace terminal color Sass variables with CSS custom property definitions**

Replace the entire content of `src/styles/_sass/_variables.scss` with:

```scss
// Typography
$base-font-family: 'Share Tech Mono', 'Courier New', monospace;
$body-font-family: 'Share Tech Mono', 'Courier New', monospace;
$code-font-family: 'Share Tech Mono', 'Courier New', monospace;
$heading-font-family: 'Orbitron', 'Share Tech Mono', monospace;

// Layout
$container-width: 1100px;
$tablet-width: 600px;
$phone-width: 480px;
$header-thickness: 56px;

// Social icon colors (brand colors - not theme-dependent)
$icon-transition-time: 1.0s;
$envelope-color: #f39c12;
$twitter-color: #00aced;
$instagram-color: #375989;
$github-color: #343434;
$linkedin-color: #0073a4;
$facebook-color: #3d5b99;
$google-color: #e64a41;
$pinterest-color: #bd081c;
$medium-color: #00AB6C;
$codepen-color: black;
$rss-color: #ff6600;

// Theme colors via CSS custom properties
:root {
  --terminal-bg: #000000;
  --terminal-green: #00ff41;
  --terminal-green-bright: #39ff14;
  --terminal-green-dim: #00cc33;
  --terminal-green-glow: rgba(0, 255, 65, 0.8);
  --terminal-shadow: rgba(0, 255, 65, 0.3);

  // Derived colors used throughout
  --terminal-bg-95: rgba(0, 0, 0, 0.95);
  --terminal-green-01: rgba(0, 255, 65, 0.1);
  --terminal-green-005: rgba(0, 255, 65, 0.05);
  --terminal-green-003: rgba(0, 255, 65, 0.03);
  --terminal-green-002: rgba(0, 255, 65, 0.02);
  --terminal-green-02: rgba(0, 255, 65, 0.2);
  --terminal-green-015: rgba(0, 255, 65, 0.15);
  --terminal-green-007: rgba(0, 255, 65, 0.07);
  --terminal-green-03: rgba(0, 255, 65, 0.3);

  // Code block background
  --code-bg: #1a1a2e;

  // Post date color
  --post-date-color: #9a9a9a;
}

[data-theme="light"] {
  --terminal-bg: #f5f5f0;
  --terminal-green: #006622;
  --terminal-green-bright: #005522;
  --terminal-green-dim: #337744;
  --terminal-green-glow: rgba(0, 102, 34, 0.15);
  --terminal-shadow: rgba(0, 102, 34, 0.1);

  --terminal-bg-95: rgba(245, 245, 240, 0.98);
  --terminal-green-01: rgba(0, 102, 34, 0.08);
  --terminal-green-005: rgba(0, 102, 34, 0.04);
  --terminal-green-003: rgba(0, 80, 30, 0.02);
  --terminal-green-002: rgba(0, 80, 30, 0.01);
  --terminal-green-02: rgba(0, 102, 34, 0.15);
  --terminal-green-015: rgba(0, 102, 34, 0.1);
  --terminal-green-007: rgba(0, 102, 34, 0.05);
  --terminal-green-03: rgba(0, 102, 34, 0.2);

  --code-bg: #f0f0e8;

  --post-date-color: #666666;
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `cd /Users/tomusdrw/conductor/workspaces/tomusdrwhub.io.git/suva && npm run build 2>&1 | tail -20`

Expected: Build succeeds (variables file doesn't break anything on its own yet — the old `$terminal-*` Sass vars are removed, so other files will fail until migrated, which is expected).

- [ ] **Step 3: Commit**

```bash
git add src/styles/_sass/_variables.scss
git commit -m "feat: define CSS custom properties for dark/light theme colors"
```

---

### Task 2: Migrate _base.scss to CSS Custom Properties

**Files:**
- Modify: `src/styles/_sass/_base.scss`

- [ ] **Step 1: Replace all color references in _base.scss**

Replace the entire content of `src/styles/_sass/_base.scss` with:

```scss
@use 'variables' as *;

@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono:wght@400&family=Orbitron:wght@400;700;900&display=swap');

/*
  Reset some basic elements
*/

body, h1, h2, h3, h4, h5, h6,
p, blockquote, pre, hr,
dl, dd, ol, ul, figure {
  margin: 0;
  padding: 0;
}

/*
  Cyberpunk Terminal Styling
*/

/* Global body styling */
body {
  background-color: var(--terminal-bg);
  color: var(--terminal-green);
  font-family: $base-font-family;
  position: relative;
  overflow-x: hidden;
}

/* Scan lines effect */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    var(--terminal-green-003) 2px,
    var(--terminal-green-003) 4px
  );
  pointer-events: none;
  z-index: 1000;
  animation: scanlines 0.1s linear infinite;
}

@keyframes scanlines {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}

/* Screen flicker effect - disabled in light mode */
body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--terminal-green-002);
  pointer-events: none;
  z-index: 999;
  animation: flicker 0.15s infinite linear alternate;
}

[data-theme="light"] body::after {
  display: none;
}

@keyframes flicker {
  0% { opacity: 1; }
  100% { opacity: 0.98; }
}

/* Headings with cyberpunk glow */
h1, h2, h3, h4, h5, h6 {
  margin-bottom: .5rem;
  font-weight: bold;
  line-height: 1.25;
  text-rendering: optimizeLegibility;
  font-family: $heading-font-family;
  color: var(--terminal-green-bright);
  text-shadow: 0 0 2px var(--terminal-shadow);
}

h1 {
  font-size: 2.5rem;
  font-weight: 900;
}
h2 {
  margin-top: 1rem;
  font-size: 1.8rem;
  font-weight: 700;
}
h3 {
  margin-top: 1.5rem;
  font-size: 1.4rem;
}
h4, h5, h6 {
  margin-top: 1rem;
  font-size: 1.1rem;
}

/* Body text with terminal styling */
body {
  font-family: $base-font-family;
}

body img {
    align: middle;
    margin: 5px auto auto auto;
    display: block;
    max-width: 600px;
    border: 1px solid var(--terminal-green-dim);
    box-shadow: 0 0 10px var(--terminal-shadow);
    filter: brightness(0.9) contrast(1.1);
}

[data-theme="light"] body img {
    filter: none;
}

p {
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  line-height: 1.65;
  font-family: $body-font-family;
  color: var(--terminal-green);
  text-shadow: 0 0 2px var(--terminal-shadow);
}

/* Lists */
ul, ol, dl {
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 1.5rem;
  font-family: $body-font-family;
}

ol li {
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 1.5rem;
}

li {
  margin-bottom: 1rem;
}

dt {
  font-weight: bold;
}
dd {
  margin-bottom: .5rem;
}

/*
  Cyberpunk Links
*/

a {
  color: var(--terminal-green-bright);
  text-decoration: none;
  text-shadow: 0 0 3px var(--terminal-green-glow);
  transition: all 0.3s ease;
  position: relative;
}

a:hover {
  color: var(--terminal-green-bright);
  text-shadow:
    0 0 5px var(--terminal-green-glow),
    0 0 10px var(--terminal-green-glow),
    0 0 15px var(--terminal-green-glow);
  animation: linkPulse 0.5s ease-in-out;
}

@keyframes linkPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--terminal-green-bright), transparent);
  transition: width 0.3s ease;
}

a:hover::after {
  width: 100%;
}

/*
  Cyberpunk Blockquote
*/

blockquote {
  margin: 10px 20px 10px;
  padding: 15px 20px;
  border-left: 3px solid var(--terminal-green);
  background: var(--terminal-green-005);
  color: var(--terminal-green-dim);
  line-height: 1.5;
  font-style: italic;
  position: relative;
  box-shadow: inset 0 0 10px var(--terminal-green-01);
}

blockquote::before {
  content: '>';
  position: absolute;
  left: 5px;
  top: 15px;
  color: var(--terminal-green-bright);
  font-weight: bold;
  text-shadow: 0 0 5px var(--terminal-green-glow);
}

/**
 * Cyberpunk Tables
 */
 table {
     border-collapse: collapse;
     margin-bottom: 30px;
     width: 100%;
     background: var(--terminal-green-002);
     box-shadow: 0 0 20px var(--terminal-green-01);
 }

 table, th, td {
     border: 1px solid var(--terminal-green-dim);
 }

 th {
     padding: 15px;
     text-align: left;
     background: var(--terminal-green-01);
     color: var(--terminal-green-bright);
     text-shadow: 0 0 3px var(--terminal-green-glow);
     font-weight: bold;
 }

 td {
     padding: 15px;
     text-align: left;
     color: var(--terminal-green);
     transition: background 0.3s ease;
 }

 tr:hover td {
     background: var(--terminal-green-005);
 }

 .highlight {
   background: var(--terminal-green-005);
   border: 1px solid var(--terminal-green-02);
   border-radius: 3px;
   padding: 1rem;
   margin: 1rem 0;
   overflow-x: auto;
 }

/* Front page only - reduced glow effects for better legibility */
.layout-home h1, .layout-home h2, .layout-home h3, .layout-home h4, .layout-home h5, .layout-home h6 {
  text-shadow: 0 0 2px var(--terminal-green-glow);
  animation: none;
}

.layout-home a {
  text-shadow: none;
}

.layout-home a:hover {
  text-shadow: 0 0 3px var(--terminal-green-glow);
}

.layout-home p {
  text-shadow: none;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/_sass/_base.scss
git commit -m "feat: migrate _base.scss to CSS custom properties"
```

---

### Task 3: Migrate _header.scss to CSS Custom Properties

**Files:**
- Modify: `src/styles/_sass/_header.scss`

- [ ] **Step 1: Replace all color references in _header.scss**

Replace the entire content of `src/styles/_sass/_header.scss` with:

```scss
@use 'variables' as *;

.site-header {
  min-height: 56px;
  width: $container-width;
  position: fixed;
  background: linear-gradient(135deg, var(--terminal-bg-95) 0%, var(--terminal-green-01) 50%, var(--terminal-bg-95) 100%);
  border-bottom: 2px solid var(--terminal-green-dim);
  box-shadow:
    0 5px 20px var(--terminal-green-03),
    inset 0 1px 0 var(--terminal-green-02);
  z-index: 100;
  backdrop-filter: blur(10px);
}

.site-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    var(--terminal-green-005) 2px,
    var(--terminal-green-005) 4px
  );
  pointer-events: none;
}

@media (max-width: $container-width) {
  .site-header {
      min-height: 56px;
      width: 95vw;
      position: fixed;
      background: linear-gradient(135deg, var(--terminal-bg-95) 0%, var(--terminal-green-01) 50%, var(--terminal-bg-95) 100%);
      border-bottom: 2px solid var(--terminal-green-dim);
      box-shadow:
        0 5px 20px var(--terminal-green-03),
        inset 0 1px 0 var(--terminal-green-02);
      z-index: 100;
      backdrop-filter: blur(10px);
  }
}
.site-header a {
  text-decoration: none;
  color: var(--terminal-green-bright);
  transition: all 0.3s ease;
}

.site-header a:hover {
  text-shadow:
    0 0 5px var(--terminal-green-glow),
    0 0 10px var(--terminal-green-glow);
}

.site-title {
  font-size: 28px;
  font-weight: 900;
  font-family: $heading-font-family;
  line-height: 56px;
  margin-bottom: 0;
  margin-top: 0;
  padding-left: 15px;
  float: left;
  color: var(--terminal-green-bright);
  text-shadow: 0 0 2px var(--terminal-shadow);
  letter-spacing: 2px;
  text-transform: uppercase;
}


.menu-list {
  line-height: $header-thickness;
  float: right;
  padding-right: 15px;
}

.menu-link {
  padding: 8px 15px;
  color: var(--terminal-green);
  font-family: $heading-font-family;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.menu-link:hover {
  color: var(--terminal-green-bright);
  border: 1px solid var(--terminal-green-dim);
  background: var(--terminal-green-01);
  text-shadow: 0 0 5px var(--terminal-green-glow);
  box-shadow: 0 0 10px var(--terminal-green-02);
}

/* Theme toggle button */
.theme-toggle {
  background: none;
  border: 1px solid transparent;
  color: var(--terminal-green);
  cursor: pointer;
  font-size: 18px;
  padding: 8px 10px;
  line-height: 1;
  transition: all 0.3s ease;
  vertical-align: middle;
}

.theme-toggle:hover {
  color: var(--terminal-green-bright);
  border-color: var(--terminal-green-dim);
  background: var(--terminal-green-01);
  text-shadow: 0 0 5px var(--terminal-green-glow);
}

/*
  Responsiveness with a dropdown menu
*/

@media (min-width: $container-width) {
  .dropbtn {
    display: none;
  }
  .dropdown-content {
    display: none;
  }
}
@media (max-width: $container-width) {
  .menu-list {
    display: none;
  }
  .site-title {
    padding-right: 0.25rem;
  }
  .dropbtn {
      background: var(--terminal-green-01);
      color: var(--terminal-green-bright);
      border: 1px solid var(--terminal-green-dim);
      padding: 16px;
      margin-top: 4px;
      font-size: 16px;
      font-family: $heading-font-family;
      font-weight: 700;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.3s ease;
  }

  .dropbtn:hover {
      background: var(--terminal-green-02);
      text-shadow: 0 0 5px var(--terminal-green-glow);
      box-shadow: 0 0 10px var(--terminal-green-03);
  }

  .dropdown {
      position: relative;
      display: inline-block;
  }

  .dropdown-content {
      display: none;
      position: absolute;
      background: var(--terminal-bg-95);
      border: 1px solid var(--terminal-green-dim);
      min-width: 160px;
      box-shadow:
        0px 8px 16px 0px var(--terminal-green-03),
        inset 0 0 10px var(--terminal-green-01);
      z-index: 1;
      backdrop-filter: blur(10px);
  }

  .dropdown-content a {
      color: var(--terminal-green);
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      font-family: $heading-font-family;
      transition: all 0.3s ease;
  }

  .dropdown-content a:hover {
    background: var(--terminal-green-01);
    color: var(--terminal-green-bright);
    text-shadow: 0 0 5px var(--terminal-green-glow);
  }

  .dropdown:hover .dropdown-content {
      display: block;
  }

  .dropdown:hover .dropbtn {
      background: var(--terminal-green-02);
      text-shadow: 0 0 5px var(--terminal-green-glow);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/_sass/_header.scss
git commit -m "feat: migrate _header.scss to CSS custom properties"
```

---

### Task 4: Migrate _footer.scss to CSS Custom Properties

**Files:**
- Modify: `src/styles/_sass/_footer.scss`

- [ ] **Step 1: Replace all color references in _footer.scss**

Replace the entire content of `src/styles/_sass/_footer.scss` with:

```scss
@use 'variables' as *;

.footer {
  background: linear-gradient(135deg, var(--terminal-bg-95) 0%, var(--terminal-green-01) 50%, var(--terminal-bg-95) 100%);
  color: var(--terminal-green);
  text-align: center;
  min-height: 56px;
  line-height: 45px;
  width: 100%;
  border-top: 2px solid var(--terminal-green-dim);
  box-shadow:
    0 -5px 20px var(--terminal-green-03),
    inset 0 1px 0 var(--terminal-green-02);
  position: relative;
  font-family: $base-font-family;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    var(--terminal-green-005) 2px,
    var(--terminal-green-005) 4px
  );
  pointer-events: none;
}

.footer a {
  color: var(--terminal-green-bright);
  padding: 0px 15px 0px;
  text-decoration: none;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-shadow: 0 0 3px var(--terminal-green-glow);
}

.footer a:hover {
  color: var(--terminal-green-bright);
  text-shadow:
    0 0 5px var(--terminal-green-glow),
    0 0 10px var(--terminal-green-glow),
    0 0 15px var(--terminal-green-glow);
  animation: footerLinkPulse 0.5s ease-in-out;
}

@keyframes footerLinkPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@media (max-width: $container-width) {
  .footer {
    background: linear-gradient(135deg, var(--terminal-bg-95) 0%, var(--terminal-green-01) 50%, var(--terminal-bg-95) 100%);
    color: var(--terminal-green);
    text-align: center;
    min-height: 56px;
    line-height: 45px;
    width: 100%;
    border-top: 2px solid var(--terminal-green-dim);
    box-shadow:
      0 -5px 20px var(--terminal-green-03),
      inset 0 1px 0 var(--terminal-green-02);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/_sass/_footer.scss
git commit -m "feat: migrate _footer.scss to CSS custom properties"
```

---

### Task 5: Migrate _home.scss to CSS Custom Properties

**Files:**
- Modify: `src/styles/_sass/_home.scss`

- [ ] **Step 1: Replace all color references in _home.scss**

Replace the entire content of `src/styles/_sass/_home.scss` with:

```scss
@use 'variables' as *;

.featured-posts {
  height: 400px;
  margin: 5px 10px 10px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  border: 2px solid var(--terminal-green-dim);
  box-shadow:
    0 0 20px var(--terminal-shadow),
    inset 0 0 20px var(--terminal-green-01);
  overflow: hidden;
}

.featured-posts::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.8) 0%,
    var(--terminal-green-01) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  z-index: 1;
}

.featured-posts::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    var(--terminal-green-03),
    transparent
  );
  animation: scanEffect 3s infinite;
  z-index: 2;
}

@keyframes scanEffect {
  0% { left: -100%; }
  100% { left: 100%; }
}

.featured-posts h2 {
  bottom: 0;
  margin: 0;
  padding: 20px;
  position: absolute;
  z-index: 3;
  width: 100%;
  box-sizing: border-box;
}

.featured-posts h2 span {
   display: inline-block;
   color: var(--terminal-green-bright);
   font-family: $heading-font-family;
   font-weight: 900;
   font-size: 24px;
   line-height: 1.2;
   letter-spacing: 1px;
   background: rgba(0, 0, 0, 0.9);
   border: 1px solid var(--terminal-green);
   padding: 15px 20px;
   text-shadow: 0 0 2px var(--terminal-shadow);
   box-shadow: 0 0 10px var(--terminal-shadow);
}

.featured-posts span a {
  color: var(--terminal-green-bright);
  text-decoration: none;
}

.featured-posts h1 {
  margin: 10px;
  z-index: 3;
  position: relative;
}

/*
  Cyberpunk Pagination
*/

.pagination {
  text-align: center;
  margin: 40px 0;
}

.pagination a {
  text-decoration: none;
}

.pagination-button {
  color: var(--terminal-green);
  background: var(--terminal-green-005);
  border: 2px solid var(--terminal-green-dim);
  padding: 15px 45px;
  margin: 10px 5px;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  font-family: $heading-font-family;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px var(--terminal-green-02);
}

.pagination-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, var(--terminal-green-01) 50%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.pagination-active {
  color: var(--terminal-green-bright);
  border-color: var(--terminal-green);
  background: var(--terminal-green-01);
  text-shadow: 0 0 5px var(--terminal-green-glow);
}

.pagination-active:hover {
  background: var(--terminal-green-015);
  border-color: var(--terminal-green-bright);
  color: var(--terminal-green-bright);
  text-shadow:
    0 0 10px var(--terminal-green-glow),
    0 0 20px var(--terminal-green-glow);
  box-shadow:
    0 0 20px var(--terminal-shadow),
    inset 0 0 10px var(--terminal-green-02);
  transform: translateY(-2px);
}

.pagination-active:hover::before {
  opacity: 1;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/_sass/_home.scss
git commit -m "feat: migrate _home.scss to CSS custom properties"
```

---

### Task 6: Migrate _post.scss and _code.scss to CSS Custom Properties

**Files:**
- Modify: `src/styles/_sass/_post.scss`
- Modify: `src/styles/_sass/_code.scss`

- [ ] **Step 1: Update _post.scss**

In `src/styles/_sass/_post.scss`, replace the hardcoded `#9a9a9a` color:

Find:
```scss
  color: #9a9a9a;
```

Replace with:
```scss
  color: var(--post-date-color);
```

- [ ] **Step 2: Update _code.scss**

Replace the entire content of `src/styles/_sass/_code.scss` with:

```scss
@use 'variables' as *;

code,
pre {
  font-family: $code-font-family
}
code {
  padding: .25em .5em;
  font-size: .8rem;
  background-color: var(--code-bg);
  border-radius: 3px;
}
pre {
  display: block;
  margin-top: 0;
  margin-bottom: 1rem;
  padding: 1rem;
  font-size: .8rem;
  line-height: 1.4;
  white-space: pre;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
  background-color: var(--code-bg);
}
pre code {
  padding: 0;
  font-size: 100%;
  color: inherit;
  background-color: transparent;
}

/* Pygments via Jekyll */
.highlight {
  margin-bottom: 1rem;
  border-radius: 4px;
}
.highlight pre {
  margin-bottom: 0;
}

/* Gist via GitHub Pages */
.gist .gist-file {
  font-family: $code-font-family !important;
}
.gist .markdown-body {
  padding: 15px;
}
.gist pre {
  padding: 0;
  background-color: transparent;
}
.gist .gist-file .gist-data {
  font-size: .8rem !important;
  line-height: 1.4;
}
.gist code {
  padding: 0;
  color: inherit;
  background-color: transparent;
  border-radius: 0;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/_sass/_post.scss src/styles/_sass/_code.scss
git commit -m "feat: migrate _post.scss and _code.scss to CSS custom properties"
```

---

### Task 7: Migrate projects.astro Scoped Styles

**Files:**
- Modify: `src/pages/projects.astro`

- [ ] **Step 1: Replace all hardcoded colors in scoped styles**

In `src/pages/projects.astro`, replace the entire `<style>` block (lines 36-170) with:

```html
<style>
.projects-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}

.projects-subtitle {
  color: var(--terminal-green-dim);
  font-size: 0.9rem;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.project-category {
  margin-bottom: 3rem;
}

.category-title {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--terminal-green-03);
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.project-card {
  display: block;
  background: var(--terminal-green-003);
  border: 1px solid var(--terminal-green-02);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
}

.project-card::after {
  display: none;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--terminal-green), transparent);
  transition: left 0.5s ease;
}

.project-card:hover {
  border-color: var(--terminal-green);
  background: var(--terminal-green-007);
  box-shadow: 0 0 20px var(--terminal-green-015), inset 0 0 20px var(--terminal-green-005);
  transform: translateY(-2px);
}

.project-card:hover::before {
  left: 100%;
}

.project-card-inner {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}

.project-name {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  margin-top: 0;
  color: var(--terminal-green-bright);
  word-break: break-all;
}

.project-dates {
  font-size: 0.75rem;
  color: var(--terminal-green-dim);
  opacity: 0.5;
  margin-bottom: 0.5rem;
  font-family: 'Share Tech Mono', 'Courier New', monospace;
  text-shadow: none !important;
}

.project-desc {
  font-size: 0.85rem;
  color: var(--terminal-green-dim);
  margin-top: 0;
  margin-bottom: 1rem;
  flex-grow: 1;
  line-height: 1.5;
  opacity: 0.85;
}

.project-links {
  display: flex;
  gap: 0.75rem;
}

.project-link-repo {
  font-family: 'Orbitron', 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 6px 14px;
  color: var(--terminal-green-dim);
  border: 1px solid var(--terminal-green-03);
  background: transparent;
  transition: all 0.3s ease;
  display: inline-block;
  cursor: pointer;
  text-shadow: none !important;
}

.project-link-repo:hover {
  border-color: var(--terminal-green);
  background: var(--terminal-green-01);
  box-shadow: 0 0 10px var(--terminal-green-02);
}

@media (max-width: 600px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/projects.astro
git commit -m "feat: migrate projects.astro scoped styles to CSS custom properties"
```

---

### Task 8: Add Theme Detection Script to BaseLayout.astro

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Add inline theme detection script in `<head>`**

In `src/layouts/BaseLayout.astro`, add this script tag immediately after the `<link rel="stylesheet" ...font-awesome...>` line (line 35) and before the `<script type="text/javascript" ...mathjax...>` line (line 36):

```html
  <script is:inline>
    (function() {
      var saved = localStorage.getItem('theme');
      var theme;
      if (saved === 'light' || saved === 'dark') {
        theme = saved;
      } else {
        theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      }
      document.documentElement.dataset.theme = theme;

      // Listen for OS-level theme changes (only when user hasn't explicitly chosen)
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
          document.documentElement.dataset.theme = e.matches ? 'light' : 'dark';
        }
      });
    })();
  </script>
```

Note: `is:inline` is required in Astro to keep the script as-is in `<head>` without bundling.

- [ ] **Step 2: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add inline theme detection script to prevent flash"
```

---

### Task 9: Add Theme Toggle Button to Header.astro

**Files:**
- Modify: `src/components/Header.astro`

- [ ] **Step 1: Add toggle button to desktop nav and mobile dropdown**

Replace the entire content of `src/components/Header.astro` with:

```astro
---
import { siteSettings } from '../data/settings';
---

<header class="site-header">
  <h3 class="site-title">
    <a href="/">{siteSettings.title}</a>
  </h3>
  <nav class="menu-list">
    {siteSettings.menu.map(item => (
      <a href={item.path} class="menu-link">{item.name}</a>
    ))}
    {siteSettings.social.map(item => (
      <a href={item.link} class="menu-link" target="_blank" rel="me">
        <i class={`fa fa-${item.icon}`} aria-hidden="true"></i>
      </a>
    ))}
    <button class="theme-toggle" id="theme-toggle" aria-label="Switch theme">
      <span class="theme-icon"></span>
    </button>
  </nav>
  <div class="dropdown">
    <button class="dropbtn"><i class="fa fa-bars" aria-hidden="true"></i></button>
    <div class="dropdown-content">
      {siteSettings.menu.map(item => (
        <a href={item.path} class="menu-link">{item.name}</a>
      ))}
      {siteSettings.social.map(item => (
        <a href={item.link} class="menu-link" target="_blank" rel="me">
          <i class={`fa fa-${item.icon}`} aria-hidden="true"></i>
        </a>
      ))}
      <button class="theme-toggle" id="theme-toggle-mobile" aria-label="Switch theme">
        <span class="theme-icon"></span>
      </button>
    </div>
  </div>
</header>

<script is:inline>
  function updateToggleIcons() {
    var isDark = document.documentElement.dataset.theme !== 'light';
    var icons = document.querySelectorAll('.theme-icon');
    icons.forEach(function(icon) {
      icon.textContent = isDark ? '\u2600' : '\u263E';
    });
  }

  function toggleTheme() {
    var current = document.documentElement.dataset.theme;
    var next = current === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    updateToggleIcons();
  }

  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('theme-toggle-mobile').addEventListener('click', toggleTheme);
  updateToggleIcons();
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: add theme toggle button to header"
```

---

### Task 10: Configure Shiki Dual Theme

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Update Shiki config for dual themes**

In `astro.config.mjs`, replace:

```js
    shikiConfig: {
      theme: 'github-dark',
    },
```

with:

```js
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
```

Astro's dual-theme Shiki support generates CSS that uses `[data-theme="light"]` and `[data-theme="dark"]` selectors automatically when using the `themes` (plural) config.

- [ ] **Step 2: Commit**

```bash
git add astro.config.mjs
git commit -m "feat: configure Shiki dual theme for light/dark syntax highlighting"
```

---

### Task 11: Build Verification and Final Commit

**Files:** None (verification only)

- [ ] **Step 1: Run production build**

Run: `cd /Users/tomusdrw/conductor/workspaces/tomusdrwhub.io.git/suva && npm run build 2>&1 | tail -30`

Expected: Build completes successfully with no errors.

- [ ] **Step 2: Start dev server and verify visually**

Run: `cd /Users/tomusdrw/conductor/workspaces/tomusdrwhub.io.git/suva && npm run preview &`

Open http://localhost:4321/projects in a browser.

Verify:
- Page loads in dark mode (or light if system preference is light)
- Toggle button appears in header (sun/moon icon)
- Clicking toggle switches between dark and light themes
- Colors match the spec: dark = neon green on black, light = dark green on #f5f5f0
- Scan lines visible but subtle in light mode, no flicker in light mode
- Refreshing the page preserves the chosen theme
- Code blocks use correct syntax highlighting theme per mode

- [ ] **Step 3: Kill preview server**

Run: `kill %1` (or the preview server PID)
