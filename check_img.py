from PIL import Image

def analyze(path):
    img = Image.open(path).convert('RGB')
    img = img.resize((50, 50))
    pixels = list(img.getdata())
    r = sum(p[0] for p in pixels) / len(pixels)
    g = sum(p[1] for p in pixels) / len(pixels)
    b = sum(p[2] for p in pixels) / len(pixels)
    print(f"{path}: R={r:.1f}, G={g:.1f}, B={b:.1f}")

analyze('assets/images/background-home.jpg')
analyze('assets/images/foto_renascer1.jpg')
analyze('assets/images/about-renascer.jpg')
