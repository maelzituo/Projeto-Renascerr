const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');

async function processImage() {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    
    // 1. Draw the background image
    try {
        const bg = await loadImage('assets/images/background-home.jpg');
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
    } catch(e) { console.error(e); }
    
    // 2. Add the dark gradient overlay (from-renascer-dark/80 via-renascer-dark/50 to-renascer-dark)
    // renascer-dark is #062c14 (RGB 6, 44, 20)
    const gradient = ctx.createLinearGradient(0, 0, 0, 630);
    gradient.addColorStop(0, 'rgba(6, 44, 20, 0.8)');
    gradient.addColorStop(0.5, 'rgba(6, 44, 20, 0.5)');
    gradient.addColorStop(1, 'rgba(6, 44, 20, 1.0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);
    
    // 3. Draw the small pill "CIDREIRA • RS"
    ctx.font = 'bold 16px sans-serif';
    const pillText = "CIDREIRA • RS";
    const pillWidth = ctx.measureText(pillText).width + 30;
    const pillHeight = 32;
    const pillX = (1200 - pillWidth) / 2;
    const pillY = 160;
    
    ctx.fillStyle = 'rgba(6, 44, 20, 0.5)'; // Dark bg
    ctx.strokeStyle = '#16A05D'; // renascer-green
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 16);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#16A05D';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(pillText, 1200 / 2, pillY + pillHeight / 2);
    
    // 4. Draw the main title "RENASCER"
    ctx.font = 'bold 140px sans-serif'; // Assuming Outfit or similar bold sans
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
    ctx.fillText("RENASCER", 1200 / 2, 320);
    ctx.shadowBlur = 0; // reset shadow
    ctx.shadowColor = 'transparent';
    
    // 5. Draw the subtitle
    ctx.font = '40px sans-serif';
    ctx.fillText("Mais que futebol.", 1200 / 2, 410);
    
    // "Uma nova oportunidade."
    ctx.font = '40px sans-serif';
    const part1 = "Uma ";
    const part2 = "nova oportunidade.";
    
    const part1Width = ctx.measureText(part1).width;
    const part2Width = ctx.measureText(part2).width;
    const totalWidth = part1Width + part2Width;
    
    const startX = (1200 - totalWidth) / 2;
    
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(part1, startX, 470);
    
    ctx.fillStyle = '#16A05D'; // renascer-green
    ctx.fillText(part2, startX + part1Width, 470);
    
    // Write out the file
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
    fs.writeFileSync('assets/images/og-image.jpg', buffer);
    console.log("Hero OG Image generated successfully!");
}

processImage();
