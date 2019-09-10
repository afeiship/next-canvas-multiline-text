var nx = require('next-js-core2');
require('../src/next-canvas-multiline-text');
const { createCanvas } = require('canvas');
const canvas = createCanvas(500, 500);
const ctx = canvas.getContext('2d');
describe('api test', () => {
  test('nx.canvasMultilineText', function() {
    var res = nx.canvasMultilineText({
      ctx: ctx,
      callback: function(ctx) {
        ctx.font = '30px Arial';
      },
      lineClamp: 3,
      limitWidth: 280,
      lineHeight: 20,
      text: `道可道，非常道；名可名，非常名。
无名，天地之始，有名，万物之母。
故常无欲，以观其妙，常有欲，以观其徼。
此两者，同出而异名，同谓之玄，玄之又玄，众妙之门。`,
      tail: '...'
    });

    // console.log('res', res);

    expect(res).toEqual({
      line: 3,
      items: ['道可道，非常道；名可', '名，非常名。无名，天', '地之始，有名，万...']
    });
  });
});

describe('benchmark test', () => {
  var draw = function(inText) {
    return nx.canvasMultilineText({
      ctx: ctx,
      callback: function(ctx) {
        ctx.font = '30px Arial';
      },
      lineClamp: 3,
      limitWidth: 280,
      lineHeight: 20,
      text: inText,
      tail: '...'
    });
  };

  console.time('t1111');
  draw('中');
  console.timeEnd('t1111');

  // console.time('t2222');
  // draw('中国人');
  // console.timeEnd('t2222');

  // console.time('t3333');
  // draw(
  //   '清晨醒来，打开窗帘，一抹慵懒的阳光照进来，暖暖的，柔柔的，时光瞬间变得温婉静美，打开音乐，沏一杯花茶，躺在床上，暖阳淼淼.'
  // );
  // console.timeEnd('t3333');
});
