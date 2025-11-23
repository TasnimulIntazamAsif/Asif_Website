# Portfolio Website - HTML/Tailwind CSS Version

A professional portfolio website converted from React to pure HTML with inline Tailwind CSS. This is a static website with no build process required - just open the HTML files in a browser.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Customization](#customization)
- [Responsive Design](#responsive-design)
- [Browser Support](#browser-support)
- [File Structure](#file-structure)

## ✨ Features

- **Pure HTML/CSS/JavaScript** - No build process, no dependencies to install
- **Tailwind CSS via CDN** - All styling is inline using Tailwind utility classes
- **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Fast Loading** - Lightweight and optimized for performance
- **SEO Friendly** - Semantic HTML structure
- **Accessible** - Proper ARIA labels and keyboard navigation support

## 📁 Project Structure

```
Portfolio-main/
├── index.html          # Home page with Hero section
├── about.html          # About page with skills and experience
├── services.html       # Services offered page
├── portfolio.html     # Portfolio projects showcase
├── blog.html          # Blog posts listing
├── contact.html        # Contact form and information
└── README.md          # This documentation file
```

## 📄 Pages

### 1. **index.html** - Home Page
- Hero section with profile image
- Call-to-action buttons
- Social media links
- Smooth scroll navigation

### 2. **about.html** - About Page
- Professional introduction
- Key skills with progress bars
- Experience badges
- Responsive two-column layout

### 3. **services.html** - Services Page
- 6 service cards with icons
- Detailed service descriptions
- Feature lists for each service
- Hover effects and animations

### 4. **portfolio.html** - Portfolio Page
- 6 project showcase cards
- Project images and descriptions
- Technology tags
- GitHub and demo links

### 5. **blog.html** - Blog Page
- Blog post cards with images
- Publication dates and read times
- Category tags
- Responsive grid layout

### 6. **contact.html** - Contact Page
- Contact information display
- Professional links (LinkedIn, GitHub, Fiverr)
- Contact form with email integration
- Mobile-friendly form layout

## 🛠 Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **JavaScript (Vanilla)** - No frameworks, pure JavaScript
- **Font Awesome** - Icons library (via CDN)
- **Responsive Design** - Mobile-first approach

## 🚀 Getting Started

### Option 1: Direct Browser Opening
1. Download or clone this repository
2. Open `index.html` in any modern web browser
3. Navigate through pages using the navigation menu

### Option 2: Local Server (Recommended)
For better performance and to avoid CORS issues:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎨 Customization

### Changing Colors
All colors use Tailwind CSS classes. To change the primary color scheme:

1. Find all instances of `blue-600`, `blue-700`, etc.
2. Replace with your preferred color (e.g., `purple-600`, `green-600`)
3. Common color classes to update:
   - `bg-blue-600` → Background color
   - `text-blue-600` → Text color
   - `border-blue-600` → Border color
   - `hover:bg-blue-700` → Hover states

### Updating Content

#### Personal Information
- **Name**: Search for "Tasnimul Intazam Asif" and replace
- **Email**: Search for "intazam2896@gmail.com" and replace
- **Phone**: Search for "+880 1603 521 786" and replace
- **Location**: Search for "Gazipur, Bangladesh" and replace
- **Profile Image**: Update the image URL in `index.html` (line ~28)

#### Social Media Links
Update the following links in all HTML files:
- LinkedIn: `https://www.linkedin.com/in/asif2896`
- GitHub: `https://github.com/TasnimulIntazamAsif`
- Fiverr: `https://www.fiverr.com/sellers/asif_intezam/edit`

#### Skills Section (about.html)
Modify the skills array in the HTML:
```html
<!-- Example skill item -->
<div class="bg-white p-4 rounded-lg shadow-sm">
    <div class="flex items-center mb-2">
        <i class="fas fa-brain text-blue-600 mr-3 text-lg"></i>
        <span class="font-semibold text-gray-900">Your Skill Name</span>
        <span class="ml-auto text-sm text-gray-600">95%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2">
        <div class="bg-blue-600 h-2 rounded-full" style="width: 95%"></div>
    </div>
</div>
```

#### Portfolio Projects (portfolio.html)
Update project cards with your own projects:
```html
<div class="bg-white rounded-xl overflow-hidden shadow-sm">
    <img src="your-image-url.jpg" alt="Project Title" />
    <div class="p-6">
        <h3>Your Project Title</h3>
        <p>Your project description</p>
        <!-- Technology tags -->
        <!-- Links -->
    </div>
</div>
```

### Adding New Pages
1. Copy an existing HTML file
2. Update the navigation menu in the header
3. Modify the main content section
4. Keep the header and footer consistent

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

### Responsive Features
- Mobile hamburger menu
- Responsive grid layouts
- Flexible typography
- Touch-friendly buttons
- Optimized images

### Tailwind Responsive Classes Used
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📂 File Structure Details

```
Portfolio-main/
│
├── index.html
│   ├── Header with navigation
│   ├── Hero section
│   ├── Footer
│   └── JavaScript for interactivity
│
├── about.html
│   ├── Header
│   ├── About section with skills
│   ├── Footer
│   └── JavaScript
│
├── services.html
│   ├── Header
│   ├── Services grid
│   ├── Footer
│   └── JavaScript
│
├── portfolio.html
│   ├── Header
│   ├── Portfolio projects grid
│   ├── Footer
│   └── JavaScript
│
├── blog.html
│   ├── Header
│   ├── Blog posts grid
│   ├── Footer
│   └── JavaScript
│
├── contact.html
│   ├── Header
│   ├── Contact form and info
│   ├── Footer
│   └── JavaScript (form handling)
│
└── README.md
    └── Documentation
```

## 🔧 JavaScript Features

### Mobile Menu Toggle
- Hamburger menu for mobile devices
- Smooth open/close animation
- Icon toggle (bars ↔ times)

### Smooth Scrolling
- Smooth scroll behavior for anchor links
- Scroll to top functionality

### Header Scroll Effect
- Header background changes on scroll
- Logo color changes based on scroll position

### Contact Form
- Form validation
- Email client integration
- Form reset after submission

## 🎯 Performance Tips

1. **Optimize Images**: Compress images before using
2. **CDN Usage**: All external resources are loaded via CDN
3. **Minimize Custom CSS**: Most styling uses Tailwind utilities
4. **Lazy Loading**: Consider adding lazy loading for images

## 📝 Notes

- All CSS is inline using Tailwind classes - no external CSS files
- Font Awesome icons are loaded via CDN
- Tailwind CSS is loaded via CDN (no build process needed)
- The contact form opens the default email client
- All pages are standalone HTML files

## 🔄 Converting from React

This project was converted from a React-based portfolio. Key changes:

1. **Components → HTML Pages**: Each React component became a separate HTML page
2. **JSX → HTML**: All JSX syntax converted to standard HTML
3. **React State → Vanilla JS**: State management replaced with vanilla JavaScript
4. **Props → Direct Content**: Props replaced with direct HTML content
5. **External CSS → Inline Tailwind**: All styles converted to Tailwind utility classes

## 📞 Support

For questions or issues:
- Email: intazam2896@gmail.com
- LinkedIn: [Tasnimul Intazam Asif](https://www.linkedin.com/in/asif2896)

## 📄 License

This project is open source and available for personal and commercial use.

---

**Built with ❤️ using HTML, Tailwind CSS, and Vanilla JavaScript**
