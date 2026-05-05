const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const heroImage = path.join(__dirname, '../public/wp-content/uploads/2022/12/AdobeStock_196044089.jpeg');
const outputDir = path.join(__dirname, '../public/hero');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Sizes to generate for different screen sizes
const sizes = [
  { name: 'mobile', width: 640, quality: 80 },
  { name: 'tablet', width: 1024, quality: 85 },
  { name: 'desktop', width: 1920, quality: 90 },
  { name: 'large', width: 2560, quality: 90 },
];

async function optimizeHeroImage() {
  console.log('🚀 Starting hero image optimization...');

  try {
    // Get original image metadata
    const metadata = await sharp(heroImage).metadata();
    console.log(`📊 Original image: ${metadata.width}x${metadata.height}, ${fs.statSync(heroImage).size / 1024 / 1024}MB`);

    // Generate WebP versions (modern format, better compression)
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `hero-${size.name}.webp`);

      await sharp(heroImage)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'cover'
        })
        .webp({ quality: size.quality })
        .toFile(outputPath);

      const fileSize = fs.statSync(outputPath).size / 1024;
      console.log(`✅ Generated ${size.name} WebP: ${size.width}px wide, ${fileSize.toFixed(1)}KB`);
    }

    // Generate JPEG versions for fallback
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `hero-${size.name}.jpg`);

      await sharp(heroImage)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'cover'
        })
        .jpeg({ quality: size.quality, progressive: true })
        .toFile(outputPath);

      const fileSize = fs.statSync(outputPath).size / 1024;
      console.log(`✅ Generated ${size.name} JPEG: ${size.width}px wide, ${fileSize.toFixed(1)}KB`);
    }

    // Generate AVIF version for modern browsers (best compression)
    const avifPath = path.join(outputDir, 'hero-desktop.avif');
    await sharp(heroImage)
      .resize(1920, null, {
        withoutEnlargement: true,
        fit: 'cover'
      })
      .avif({ quality: 85, effort: 6 })
      .toFile(avifPath);

    const avifSize = fs.statSync(avifPath).size / 1024;
    console.log(`✅ Generated AVIF: 1920px wide, ${avifSize.toFixed(1)}KB`);

    console.log('🎉 Hero image optimization complete!');

    // Calculate space savings
    const originalSize = fs.statSync(heroImage).size / 1024 / 1024;
    const optimizedSize = fs.readdirSync(outputDir)
      .reduce((acc, file) => acc + fs.statSync(path.join(outputDir, file)).size, 0) / 1024 / 1024;

    console.log(`📉 Space saved: ${(originalSize - optimizedSize).toFixed(2)}MB (${((1 - optimizedSize / originalSize) * 100).toFixed(1)}% reduction)`);

  } catch (error) {
    console.error('❌ Error optimizing hero image:', error);
    process.exit(1);
  }
}

optimizeHeroImage();