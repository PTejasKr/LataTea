import fitz
import os

pdf_path = 'Lata Company Brochure English.pdf'
doc = fitz.open(pdf_path)

out_dir = 'extracted_images'
os.makedirs(out_dir, exist_ok=True)

for i in range(len(doc)):
    for img in doc.get_page_images(i):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image['image']
        image_ext = base_image['ext']
        
        # Save it
        name = f"page{i}_img{xref}.{image_ext}"
        path = os.path.join(out_dir, name)
        with open(path, "wb") as f:
            f.write(image_bytes)
        print(f"Extracted {name}, size: {len(image_bytes)} bytes")
