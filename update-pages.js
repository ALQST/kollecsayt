const fs = require('fs');
const path = require('path');

// Get all page.tsx files except slug pages
const pagesDir = path.join(__dirname, 'app');
const pages = [];

// Read all page.tsx files recursively
function readPages(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      readPages(fullPath);
    } else if (file === 'page.tsx' && !path.basename(path.dirname(fullPath)).includes('slug')) {
      pages.push(fullPath);
    }
  }
}

readPages(pagesDir);

// Update each page
pages.forEach(pagePath => {
  const content = fs.readFileSync(pagePath, 'utf-8');
  const newContent = content
    .replace(/export const dynamic = 'force-static';\nexport const revalidate = false;/, 'export const dynamic = \"force-static\";')
    .replace(/export const revalidate = false;/, '');
  
  fs.writeFileSync(pagePath, newContent, 'utf-8');
});

console.log(`Updated ${pages.length} pages`);
