const fs = require('fs');
let content = fs.readFileSync('src/components/public/Footer.tsx', 'utf8');
content = content.replace(
  /{t\('All rights reserved\.'\)}/,
  "{t('All rights reserved.')} <span className=\"opacity-50 ml-2\">[V11]</span>"
);
fs.writeFileSync('src/components/public/Footer.tsx', content, 'utf8');
