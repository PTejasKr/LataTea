const fs = require('fs');

let content = fs.readFileSync('src/data/defaultMediaAssets.ts', 'utf8');

const newItems = `,
    {
      id: 'media_packaging_sugar',
      filename: 'packaging_sugar.jpeg',
      url: '/assets/images/catalogue/page2_img3.jpeg',
      alt: 'Lata Teamix Sugar Tea Range Packaging',
      dimensions: { width: 918, height: 918 },
      fileSize: '110 KB',
      mediaType: 'image/jpeg',
      uploadedAt: new Date().toISOString()
    },
    {
      id: 'media_packaging_premix',
      filename: 'packaging_premix.jpeg',
      url: '/assets/images/catalogue/page2_img5.jpeg',
      alt: 'Lata Teamix Vending Premix Packaging',
      dimensions: { width: 909, height: 909 },
      fileSize: '110 KB',
      mediaType: 'image/jpeg',
      uploadedAt: new Date().toISOString()
    }`;

// Replace ONLY the last ];
let index = content.lastIndexOf('];');
if (index !== -1) {
    content = content.substring(0, index) + newItems + '\n  ];\n' + content.substring(index + 2);
    fs.writeFileSync('src/data/defaultMediaAssets.ts', content, 'utf8');
}
