const { createCanvas, loadImage } = require('canvas');

async function analyze(path) {
    const img = await loadImage(path);
    const canvas = createCanvas(50, 50);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 50, 50);
    const data = ctx.getImageData(0, 0, 50, 50).data;
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < data.length; i+=4) {
        r += data[i];
        g += data[i+1];
        b += data[i+2];
    }
    const count = data.length / 4;
    console.log(`${path}: R=${r/count | 0}, G=${g/count | 0}, B=${b/count | 0}`);
}
async function run() {
    await analyze('assets/images/background-home.jpg');
    await analyze('assets/images/foto_renascer1.jpg');
    await analyze('assets/images/about-renascer.jpg');
}
run();
