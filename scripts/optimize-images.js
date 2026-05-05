const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const PUBLIC_DIR = path.join(__dirname, '../public');

async function findImages(dir) {
  const files = await readdir(dir);
  const images = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await stat(filePath);

    if (stats.isDirectory()) {
      const subImages = await findImages(filePath);
      images.push(...subImages);
    } else if (
      file.match(/\.(jpg|jpeg|png|webp|gif)$/i) &&
      !file.includes('-200x150') &&
      !file.includes('-250x150')
    ) {
      images.push(filePath);
    }
  }

  return images;
}

async function optimizeImage(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const dir = path.dirname(inputPath);
    const basename = path.basename(inputPath, ext);

    console.log(`Optimizing: ${basename}${ext}`);

    // Get original image info
    const metadata = await sharp(inputPath).metadata();
    const originalSize = (await stat(inputPath)).size;

    // Create optimized versions
    const formats = [];

    // Always create WebP version (better compression)
    formats.push({
      path: path.join(dir, `${basename}.webp`),
      format: 'webp',
      quality: 80
    });

    // Keep original format but optimized
    if (ext === '.png') {
      formats.push({
        path: path.join(dir, `${basename}.png`),
        format: 'png',
        quality: 85
      });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      formats.push({
        path: path.join(dir, `${basename}.jpg`),
        format: 'jpeg',
        quality: 80
      });
    }

    // Create thumbnail versions for blog posts
    if (metadata.width > 400) {
      const thumbnailPath = path.join(dir, `${basename}-400x300.webp`);
      await sharp(inputPath)
        .resize(400, 300, { fit: 'cover', position: 'center' })
        .webp({ quality: 75 })
        .toFile(thumbnailPath);

      const thumbSize = (await stat(thumbnailPath)).size;
      console.log(`  Created thumbnail: ${basename}-400x300.webp (${(thumbSize / 1024).toFixed(1)} KB)`);
    }

    // Process each format
    for (const format of formats) {
      let pipeline = sharp(inputPath);

      if (format.format === 'webp') {
        pipeline = pipeline.webp({ quality: format.quality });
      } else if (format.format === 'png') {
        pipeline = pipeline.png({ quality: format.quality, compressionLevel: 9 });
      } else if (format.format === 'jpeg') {
        pipeline = pipeline.jpeg({ quality: format.quality, progressive: true, mozjpeg: true });
      }

      await pipeline.toFile(format.path);

      const newSize = (await stat(format.path)).size;
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

      console.log(`  ${format.format.toUpperCase()}: ${(newSize / 1024).toFixed(1)} KB (${savings}% reduction)`);
    }

    console.log(`  Original: ${(originalSize / 1024).toFixed(1)} KB`);
    console.log('');

  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');

  const images = await findImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images to optimize\n`);

  for (const image of images) {
    await optimizeImage(image);
  }

  console.log('✅ Image optimization complete!');
}

main().catch(console.error);