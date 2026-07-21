const fs = require('fs');
const path = require('path');

const artifactDir = 'C:\\Users\\ACER\\.gemini\\antigravity-cli\\brain\\0f5f143d-ada3-476b-a1d0-ceef6c976209';
const publicImagesDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

const files = fs.readdirSync(artifactDir);
const prefixes = ['watermelon', 'mango_sweet_sauce', 'pineapple', 'cantaloupe', 'strawberry_dip', 'guava_plum', 'coconut', 'orange'];

prefixes.forEach(prefix => {
  const matchingFiles = files.filter(f => f.startsWith(prefix) && f.endsWith('.jpg')).sort();
  if (matchingFiles.length > 0) {
    const latestFile = matchingFiles[matchingFiles.length - 1];
    const srcPath = path.join(artifactDir, latestFile);
    const destPath = path.join(publicImagesDir, `${prefix}.jpg`);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${latestFile} to ${prefix}.jpg`);
  } else {
    console.log(`No image found for ${prefix}`);
  }
});
