const fs = require('fs');
let content = fs.readFileSync('src/components/admin/AdminLayout.tsx', 'utf8');
content = content.replace(/Sparkles/g, 'List');
fs.writeFileSync('src/components/admin/AdminLayout.tsx', content, 'utf8');
