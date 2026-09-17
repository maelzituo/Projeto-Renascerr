const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function processImage() {
    // We will create a beautiful OG image: Dark green background, the logo in the center.
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    
    // Background color
    ctx.fillStyle = '#062c14'; // renascer-dark
    ctx.fillRect(0, 0, 1200, 630);
    
    // Optional: Draw the background image with low opacity
    try {
        const bg = await loadImage('assets/images/background-home.jpg');
        ctx.globalAlpha = 0.2; // dark overlay effect
        const imgRatio = bg.width / bg.height;
        const canvasRatio = 1200 / 630;
        let drawWidth, drawHeight, offsetX, offsetY;
        if (imgRatio > canvasRatio) {
            drawHeight = 630;
            drawWidth = bg.width * (630 / bg.height);
            offsetX = (1200 - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = 1200;
            drawHeight = bg.height * (1200 / bg.width);
            offsetX = 0;
            offsetY = (630 - drawHeight) / 2;
        }
        ctx.drawImage(bg, offsetX, offsetY, drawWidth, drawHeight);
        ctx.globalAlpha = 1.0;
    } catch(e) {}
    
    // Draw the transparent logo in the center
    try {
        const logo = await loadImage('assets/images/logo-renascer-transparent.png');
        // Let's make the logo take about 400px height
        const logoHeight = 400;
        const logoWidth = logo.width * (logoHeight / logo.height);
        const logoX = (1200 - logoWidth) / 2;
        const logoY = (630 - logoHeight) / 2;
        
        ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
    } catch(e) {}
    
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
    fs.writeFileSync('assets/images/og-image.jpg', buffer);
    console.log("New OG Image generated successfully!");
}

processImage();
