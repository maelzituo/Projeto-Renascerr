const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// We will replace everything from <title> up to <!-- Fonts -->
const startMarker = '<title>';
const endMarker = '    <!-- Fonts -->';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const newMeta = `<title>Renascer Futebol Clube | Mais que futebol. Uma nova oportunidade.</title>
    <link rel="icon" type="image/png" href="assets/images/favicon.png">
    <meta name="description" content="Conheça o Renascer Futebol Clube e o nosso projeto através do esporte, da união e das oportunidades.">
    <meta name="theme-color" content="#06241b">
    
    <!-- Open Graph / SEO -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Renascer Futebol Clube | Mais que futebol. Uma nova oportunidade.">
    <meta property="og:description" content="Conheça o Renascer Futebol Clube e o nosso projeto através do esporte, da união e das oportunidades.">
    <meta property="og:url" content="https://projeto-renascerr.vercel.app/">
    <meta property="og:image" content="https://projeto-renascerr.vercel.app/assets/images/og-image.jpg">
    <meta property="og:image:secure_url" content="https://projeto-renascerr.vercel.app/assets/images/og-image.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Renascer Futebol Clube">

    <!-- Twitter / X Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Renascer Futebol Clube | Mais que futebol. Uma nova oportunidade.">
    <meta name="twitter:description" content="Conheça o Renascer Futebol Clube e o nosso projeto através do esporte, da união e das oportunidades.">
    <meta name="twitter:image" content="https://projeto-renascerr.vercel.app/assets/images/og-image.jpg">

`;
    
    html = html.substring(0, startIndex) + newMeta + html.substring(endIndex);
    fs.writeFileSync('index.html', html);
    console.log("Meta tags updated successfully.");
} else {
    console.log("Could not find markers.");
}
