from PIL import Image
import os

out_dir = 'extracted_images'
for file in os.listdir(out_dir):
    if file.endswith(('.jpeg', '.png', '.jpg')):
        path = os.path.join(out_dir, file)
        with Image.open(path) as img:
            print(f"{file}: {img.width}x{img.height}, {os.path.getsize(path)} bytes")
