const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else if (filepath.endsWith('.ts') || filepath.endsWith('.tsx')) {
      filelist.push(filepath);
    }
  }
  return filelist;
};

const files = walkSync('src/components/admin');
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace colors with neutral/monochrome shades
  content = content.replace(/text-amber-[0-9]+/g, 'text-gray-300');
  content = content.replace(/bg-amber-[0-9]+/g, 'bg-gray-400');
  content = content.replace(/border-amber-[0-9]+/g, 'border-gray-500');
  content = content.replace(/fill-amber-[0-9]+/g, 'fill-gray-400');

  content = content.replace(/text-purple-[0-9]+/g, 'text-gray-300');
  content = content.replace(/bg-purple-[0-9]+/g, 'bg-gray-400');
  content = content.replace(/border-purple-[0-9]+/g, 'border-gray-500');
  
  content = content.replace(/text-emerald-[0-9]+/g, 'text-gray-400');
  content = content.replace(/bg-emerald-[0-9]+/g, 'bg-gray-400');
  
  content = content.replace(/bg-gradient-to-r from-amber-[0-9]+ to-amber-[0-9]+/g, 'bg-neutral-800');
  content = content.replace(/hover:from-amber-[0-9]+ hover:to-amber-[0-9]+/g, 'hover:bg-neutral-700');
  
  // Any brand colors?
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
  }
}
