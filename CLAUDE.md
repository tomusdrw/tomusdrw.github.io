# CLAUDE.md

## Project Overview

Personal website for Tomek Drwięga at [todr.me](https://todr.me). Built with Astro v5, deployed as a static site.

## Key Conventions

- **README sync:** All changes to website content (projects, blog posts, pages) must be reflected in `README.md`. Keep it up to date.
- Site URL: `https://todr.me`
- Homepage redirects to `/projects`

## Project Structure

```
src/
  content/blog/     # Markdown blog posts (frontmatter: title, date, author, categories, tags, image)
  data/projects.ts  # Projects list shown on /projects page (grouped by category)
  data/settings.ts  # Site-wide settings (title, menu, social links)
  pages/            # Astro page routes
  layouts/          # Page layouts
  components/       # Reusable components
  styles/           # Sass stylesheets
public/             # Static assets
```

## Commands

```bash
npm run dev       # Start dev server (localhost:4321)
npm run build     # Production build
npm run preview   # Preview production build
```

## Content Editing

### Adding a blog post
1. Create `src/content/blog/YYYY-MM-DD-slug.md` with frontmatter (title, date, author, categories, tags, image)
2. Add an entry to the Blog Posts table in `README.md`

### Adding a project
1. Add an entry to the appropriate category in `src/data/projects.ts`
2. Add a row to the matching Projects table in `README.md`

### Changing site settings
Edit `src/data/settings.ts` for menu items, social links, and site metadata.
