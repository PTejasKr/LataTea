import fitz
doc = fitz.open('Lata Company Brochure English.pdf')
with open('pdf_text.txt', 'w', encoding='utf-8') as f:
    for i in range(len(doc)):
        f.write(f'--- PAGE {i} ---\n')
        f.write(doc.get_page_text(i))
        f.write('\n')
