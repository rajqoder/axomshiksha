# Axomshiksha

Axomshiksha is a comprehensive educational platform dedicated to making quality education accessible to everyone. The platform provides free educational resources, tutorials, and learning materials for students and educators across various subjects.

## 🌐 Live Site

The website is live at: [https://axomshiksha.com/](https://axomshiksha.com/)

## 🚀 Features

- **Educational Content**: Comprehensive tutorials, articles, and resources covering various subjects
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Dark/Light Mode**: Toggle between themes for comfortable reading in any lighting condition
- **Search Functionality**: Easy search to find specific content across the site
- **Category Organization**: Content organized by categories for easy navigation
- **Tag System**: Posts categorized with tags for better discoverability
- **Writer Profiles**: Content attributed to specific writers/authors
- **Reading Time Estimates**: Estimated reading time for each article
- **FAQ Section**: Interactive accordion-style FAQ with common questions
- **Social Media Integration**: Connect with us on various social platforms
- **PWA Support**: Installable as a native app with offline capabilities
- **Math Support**: High-quality math rendering using MathJax v4 (CDN)

## 🛠️ Technology Stack

- **Hugo**: Lightning-fast static site generation
- **Tailwind CSS**: Modern, responsive design framework
- **JavaScript**: Interactive features and functionality
- **Netlify**: Hosting and deployment

### Dependencies
- `@tailwindcss/cli`: ^4.1.18
- `tailwindcss`: ^4.1.18
- `mathjax`: ^4.x (CDN)

## 📁 Project Structure

```
├── archetypes/          # Content templates
├── assets/              # CSS, JavaScript, and other assets
│   ├── css/
│   │   ├── fonts.css
│   │   └── main.css
│   └── js/              # JavaScript files for site functionality
├── content/             # Markdown content files
│   ├── _index.md        # Homepage content
│   ├── about.md         # About page
│   ├── faq.md           # FAQ page with questions
│   ├── categories/      # Categorized content
│   └── posts/           # Educational posts
├── data/                # Data files (e.g., writers.json)
├── layouts/             # HTML templates
│   ├── _partials/       # Reusable components
│   ├── categories/      # Category-specific layouts
│   ├── tags/            # Tag-specific layouts
│   ├── writers/         # Writer profile layouts
│   └── pages/           # Specific page layouts
├── static/              # Static files (images, etc.)
├── hugo.toml            # Hugo configuration
├── netlify.toml         # Netlify deployment configuration
└── package.json         # Node.js dependencies
```

## 📝 Content Categories

The platform covers various educational topics including:
- Competitive Exam Preparation
- Higher Secondary Physics
- Lower Primary Mathematics
- Middle Primary Science
- General tutorials and educational resources

## 🔧 Local Development

1. **Install Hugo**:
   ```bash
   # Install Hugo Extended version
   # Follow instructions at https://gohugo.io/getting-started/installing/
   ```

2. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd axomshiksha
   ```

3. **Install dependencies**:
   ```bash
   bun install
   # or
   npm install
   ```

4. **Run the development server**:
   ```bash
   hugo server
   ```

5. **Access the site**:
   Visit `http://localhost:1313` in your browser

## 📋 Configuration

The site configuration is managed in `hugo.toml`:

- **Base URL**: `https://axomshiksha.com/`
- **Language Code**: `as-IN` (Assamese India)
- **SEO Settings**: Includes meta descriptions, keywords, and Open Graph tags
- **Taxonomies**: Tags, categories, and writers
- **Code Highlighting**: Using Dracula theme with line numbers

## 🎨 Customization

### Adding New Content

To create a new post:
```bash
hugo new posts/my-new-post.md
```

Posts should include front matter with:
- `title`: The title of the post
- `date`: Publication date
- `draft`: Whether the post is a draft
- `tags`: Associated tags
- `categories`: Content category
- `readingTime`: Estimated reading time
- `writers`: Author information
- `thumbnail`: Featured image URL

### Adding FAQ Items

FAQ items are added directly in `content/faq.md`:
```yaml
faqs:
  - question: "Your question here"
    answer: "Your answer here"
```

## Notes

- Use `900 x 400` pixel images for the best display experience.

## 🤝 Contributing

While external contributions are currently not being accepted, stay tuned for future updates! The platform may open up for community contributions in the future.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Axomshiksha is dedicated to making quality education accessible to everyone through free, comprehensive educational content. We believe that knowledge should be freely available to all learners, regardless of their background or location.