const fs = require('fs');

let content = fs.readFileSync('src/data/defaultContent.ts', 'utf8');

// 1. Add MediaSlots
const newSlots = `
  STORY_IMAGE_SUGAR: {
    id: 'slot_story_sugar',
    slotKey: 'STORY_IMAGE_SUGAR',
    label: 'Sugar Basundi Packaging',
    category: 'story',
    desktopImageId: 'media_packaging_sugar',
    mobileImageId: 'media_packaging_sugar',
    focalX: 50,
  },
  STORY_IMAGE_PREMIX: {
    id: 'slot_story_premix',
    slotKey: 'STORY_IMAGE_PREMIX',
    label: 'Premix Packaging',
    category: 'story',
    desktopImageId: 'media_packaging_premix',
    mobileImageId: 'media_packaging_premix',
    focalX: 50,
  },
`;
content = content.replace('STORY_IMAGE_PACKAGING: {', newSlots + '\n  STORY_IMAGE_PACKAGING: {');

// 2. Update tea_sugar_basundi
let sugarIndex = content.indexOf(`id: 'tea_sugar_basundi'`);
if(sugarIndex !== -1) {
  let sub = content.substring(sugarIndex);
  let orderIndex = sub.indexOf('displayOrder: 4');
  let slotIndex = sub.lastIndexOf('imageSlotId:', orderIndex);
  let oldSlot = sub.substring(slotIndex, sub.indexOf(',', slotIndex));
  content = content.replace(oldSlot, `imageSlotId: 'STORY_IMAGE_SUGAR'`);
  console.log("Replaced sugar slot: " + oldSlot);
}

// 3. Update tea_instant_premix
let premixIndex = content.indexOf(`id: 'tea_instant_premix'`);
if(premixIndex !== -1) {
  let sub = content.substring(premixIndex);
  let orderIndex = sub.indexOf('displayOrder: 5');
  let slotIndex = sub.lastIndexOf('imageSlotId:', orderIndex);
  let oldSlot = sub.substring(slotIndex, sub.indexOf(',', slotIndex));
  content = content.replace(oldSlot, `imageSlotId: 'STORY_IMAGE_PREMIX'`);
  console.log("Replaced premix slot: " + oldSlot);
}

fs.writeFileSync('src/data/defaultContent.ts', content, 'utf8');
