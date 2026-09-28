from PIL import Image
import os

images = [
    'public/assets/images/hero_tea_panoramic.png',
    'public/assets/images/royal_tea_panoramic.png',
    'public/assets/images/hero_gemini_tea.png',
    'public/assets/images/logo-teamix.png',
    'public/favicon.png',
    'public/assets/images/packaging_gud.jpeg',
    'public/assets/images/royal_tea_bowl.jpg',
    'public/assets/images/catalogue/page2_img3.jpeg',
    'public/assets/images/catalogue/page2_img5.jpeg',
    'public/assets/images/catalogue/page4_img1.jpeg',
    'public/assets/images/catalogue/page5_img1.jpeg',
]

for p in images:
    if os.path.exists(p):
        im = Image.open(p)
        print(f"{p}: format={im.format}, size={im.size}, bytes={os.path.getsize(p)}")
