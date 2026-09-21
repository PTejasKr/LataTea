import os
from PIL import Image

input_dir = r"extracted_images"
output_dir = r"public\assets\images\catalogue"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for filename in os.listdir(input_dir):
    if filename.endswith(".jpeg") or filename.endswith(".jpg"):
        filepath = os.path.join(input_dir, filename)
        
        img = Image.open(filepath)
        w, h = img.size
        
        new_w = w * 2
        new_h = h * 2
        img_upscaled = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        out_path = os.path.join(output_dir, filename)
        img_upscaled.save(out_path, quality=95)
        print(f"Upscaled {filename} from {w}x{h} to {new_w}x{new_h}")

print("Upscaling complete.")
