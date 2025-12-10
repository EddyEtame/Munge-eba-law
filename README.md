# Trinity Law Firm Website

A modern, responsive law firm website built with React and Framer Motion animations.

## Features

- **Responsive Design**: Works on all devices
- **Smooth Animations**: Powered by Framer Motion
- **Modern UI**: Clean, professional design
- **Interactive Elements**: Hover effects and smooth transitions
- **Contact Form**: Functional contact form with validation

## Dependencies

The website uses CDN links for all major dependencies:
- **React 18**: UI framework
- **React DOM**: React rendering
- **Framer Motion**: Animation library
- **Tailwind CSS**: Utility-first CSS framework
- **Babel**: JavaScript compiler

## Running Locally

### Option 1: Using npm serve (Recommended)
```bash
npm run serve
```
Then open http://localhost:3000 in your browser.

### Option 2: Using Python HTTP server
```bash
npm run dev
```
Then open http://localhost:8000 in your browser.

### Option 3: Direct file opening
Simply double-click `index.html` to open it in your default browser.

## Project Structure

```
Law firm/
├── index.html          # Main HTML file with embedded React component
├── Law Firm.js         # Original React component (for reference)
├── package.json        # Project configuration
└── README.md          # This file
```

## Customization

The website is highly customizable through the component props:
- `primaryColor`: Main brand color (default: #0a2351)
- `accentColor`: Accent color (default: #bf9b30)
- `ctaText`: Call-to-action button text
- `animationDuration`: Animation speed
- `animationDelay`: Stagger delay between elements

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- All dependencies are loaded from CDN for simplicity
- The website works offline once loaded
- No build process required - just open the HTML file

