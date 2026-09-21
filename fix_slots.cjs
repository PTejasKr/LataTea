const fs = require('fs');
let content = fs.readFileSync('src/data/defaultContent.ts', 'utf8');

content = content.replace(
  `focalX: 50,
  },
  STORY_IMAGE_PREMIX:`,
  `focalX: 50,
    focalY: 50,
    objectFit: 'contain',
    description: 'Packaging image for Sugar Basundi',
  },
  STORY_IMAGE_PREMIX:`
);

content = content.replace(
  `focalX: 50,
  },

  STORY_IMAGE_PACKAGING:`,
  `focalX: 50,
    focalY: 50,
    objectFit: 'contain',
    description: 'Packaging image for Basundi Premix',
  },

  STORY_IMAGE_PACKAGING:`
);

fs.writeFileSync('src/data/defaultContent.ts', content, 'utf8');
