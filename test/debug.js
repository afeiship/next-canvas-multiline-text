var nx = require('next-js-core2');
require('../src/next-canvas-multiline-text');
const { createCanvas } = require('canvas');

var res = nx.canvasMultilineText({
  canvas: createCanvas(500, 500),
  callback: function(ctx) {
    ctx.font = '30px Arial';
  },
  lineClamp: 2,
  limitWidth: 500,
  lineHeight: 20,
  text: `道可道，非常道；名可名，非常名。 无名，天地之始，有名，万物之母。 故常无欲，以观其妙，常有欲，以观其徼。 此两者，同出而异名，同谓之玄，玄之又玄，众妙之门。`,
  tail: '...'
});
