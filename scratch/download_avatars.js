const fs = require('fs');
const path = require('path');

const images = [
  { url: 'https://www.thewebtycoons.com/uploaded_image_home/vishesh-jindal.jpg', filename: 'vishesh-jindal.jpg' },
  { url: 'https://www.thewebtycoons.com/uploaded_image_home/01.png', filename: 'rajeev-tyagi.png' },
  { url: 'https://www.thewebtycoons.com/uploaded_image_home/prateek-bhardwaj.jpg', filename: 'prateek-bhardwaj.jpg' },
  { url: 'https://www.thewebtycoons.com/uploaded_image_home/austro.jpg', filename: 'ashok-aggarwal.jpg' },
  { url: 'https://www.thewebtycoons.com/uploaded_image_home/parmod.jpg', filename: 'parmod-mittal.jpg' },
  { url: 'https://www.thewebtycoons.com/uploaded_image_home/cocofoam.jpg', filename: 'nitin-goel.jpg' },
];

const targetDir = path.join(process.cwd(), 'public', 'assets', 'img', 'testimonials');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function downloadImages() {
  for (const item of images) {
    try {
      console.log('Fetching', item.url);
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        }
      });
      if (!res.ok) {
        console.error('Failed to fetch', item.url, res.status);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      const dest = path.join(targetDir, item.filename);
      fs.writeFileSync(dest, buffer);
      console.log('Saved', dest, buffer.length, 'bytes');
    } catch (e) {
      console.error('Error fetching', item.url, e.message);
    }
  }
}

downloadImages();
