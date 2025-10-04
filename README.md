# Personal Homepage - Xiaoyu Zhang

A modern, minimalist academic personal homepage inspired by contemporary web design principles.

## Features

- **Clean Academic Design**: Minimalist layout focusing on research achievements and professional background
- **Responsive Layout**: Fully responsive design that works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Elegant fade-in effects and smooth scrolling for enhanced user experience
- **Interactive Elements**:
  - Hover effects on navigation and links
  - Profile image toggle effect
  - Back-to-top button for easy navigation
  - Active section highlighting in navigation
- **Professional Typography**: Uses Crimson Text serif font (22px) for a scholarly aesthetic
- **Organized Sections**:
  - Profile with bio and contact links
  - News updates
  - Publications with year-based organization
  - Education timeline
  - Contact information

## File Structure

```
.
├── index.html          # Main HTML structure
├── style.css           # All styling and responsive design
├── script.js           # Interactive features and animations
├── papers/             # PDF files for publications
└── README.md           # This file
```

## Customization

### Adding Your Profile Picture

Replace the placeholder image in `index.html`:

```html
<img src="path/to/your/photo.jpg" alt="Xiaoyu Zhang" id="profileImg">
```

### Updating Content

- **Publications**: Edit the publication entries in `index.html` under the `#publications` section
- **News**: Update news items in the `#news` section
- **Education**: Modify education entries in the `#education` section
- **Contact**: Update email and social links in the header and contact sections

### Styling

All visual styling is controlled through CSS custom properties in `style.css`:

```css
:root {
    --bg-color: #ffffff;
    --text-color: #2c3e50;
    --link-color: #3498db;
    --link-hover: #2980b9;
    --border-color: #e0e0e0;
    --accent-color: #34495e;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Xiaoyu Zhang. All rights reserved.

## Deployment

This site is designed to work with GitHub Pages. Simply push to your repository and enable GitHub Pages in settings.

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select the branch (usually `main`) and root folder
4. Save and your site will be live at `https://yourusername.github.io`

## Local Development

To view locally, simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

Then navigate to `http://localhost:8000`

## Credits

Design inspired by modern academic personal homepages with a focus on clarity and professionalism.
