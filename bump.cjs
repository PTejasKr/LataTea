const fs = require('fs');
let content = fs.readFileSync('src/services/cmsStore.ts', 'utf8');
content = content.replace('latatea_cms_v11_pub', 'latatea_cms_v12_pub');
content = content.replace('latatea_cms_v11_draft', 'latatea_cms_v12_draft');
fs.writeFileSync('src/services/cmsStore.ts', content, 'utf8');

let footer = fs.readFileSync('src/components/public/Footer.tsx', 'utf8');
footer = footer.replace('[V11]', '[V12]');
fs.writeFileSync('src/components/public/Footer.tsx', footer, 'utf8');
