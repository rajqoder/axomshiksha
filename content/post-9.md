---
date: '2025-12-21T12:15:00+05:30'
draft: false
title: 'Hugo with GitHub Pages'
tags:
    - 'hugo'
    - 'github'
    - 'deployment'
    - 'hosting'
writers:
    - 'Admin'
categories:
    - 'Diploma'
readingTime: '8 mins'
thumbnail: 'https://picsum.photos/800/400?random=9'
---

GitHub Pages is a popular free hosting option for static sites, and Hugo integrates seamlessly with it. In this post, we'll walk through setting up continuous deployment of your Hugo site to GitHub Pages.

## GitHub Pages Basics

GitHub Pages offers three types of sites:
1. User/Organization sites (username.github.io)
2. Project sites (username.github.io/projectname)
3. Project sites with custom domains

## Setting Up Hugo with GitHub Pages

### Repository Structure

For a User/Organization site:
- Create a repository named `username.github.io`
- Your Hugo site files go in the main branch

For a Project site:
- Create a repository with any name
- GitHub Pages will publish from the `gh-pages` branch

### Workflow Setup

Create a GitHub Actions workflow file at `.github/workflows/gh-pages.yml`:

```yaml
name: GitHub Pages

on:
  push:
    branches:
      - main  # or master, depending on your default branch

jobs:
  deploy:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

## Configuration Considerations

### Base URL

Set your baseURL correctly in `hugo.toml`:

For User/Organization sites:
```toml
baseURL = "https://username.github.io/"
```

For Project sites:
```toml
baseURL = "https://username.github.io/projectname/"
```

### Custom Domains

To use a custom domain:
1. Add a `CNAME` file to your `static` directory with your domain
2. Configure DNS settings with your domain registrar

## Publishing Process

1. Commit and push changes to your main branch
2. GitHub Actions automatically builds and deploys your site
3. Visit your site at the GitHub Pages URL

## Advanced Tips

### Asset Optimization

- Use Hugo Pipes for asset processing
- Enable minification in your build process
- Optimize images before adding them to your site

### Monitoring

- Enable GitHub Pages build notifications
- Monitor your site's performance regularly
- Check for broken links periodically

### Security

- Keep your Hugo version updated
- Review third-party themes and plugins
- Use HTTPS (automatically provided by GitHub Pages)

Deploying your Hugo site to GitHub Pages is straightforward and cost-effective, making it an excellent choice for personal blogs, project documentation, and small business sites.