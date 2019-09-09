(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var EMPTY_STR = '';
  var DEFAULT_OPTIONS = {
    lineClamp: 100,
    limitWidth: 500,
    lineHeight: 20,
    canvas: null,
    callback: nx.noop,
    text: '',
    tail: '...'
  };

  var trim = function(str) {
    if (!str) return str;
    return str.replace(/[\r\n]/g, '');
  };

  nx.canvasMultilineText = function(inOptions) {
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var ctx = options.canvas.getContext('2d');
    var words = trim(options.text).split(EMPTY_STR);
    var tmp = EMPTY_STR;
    var line = 1;
    var items = [];
    var tms = null;
    var len = words.length;
    var len_ = len - 1;
    var i = 0;

    if (!options.text) return { line: 0, items: items };
    // initial setting:
    options.callback(ctx);

    for (; i < len; i++) {
      var word = words[i];
      tmp += word;
      tms = ctx.measureText(tmp);
      if (tms.width >= options.limitWidth) {
        items.push(tmp);
        // update line & reset
        line++;
        tmp = EMPTY_STR;
      }

      if (line - 1 === options.lineClamp) {
        break;
      }
    }

    if (i < len_) {
      var last = items[items.length - 1].split(EMPTY_STR);
      last.splice(-2, 2);
      last.push(options.tail);
      items[items.length - 1] = last.join(EMPTY_STR);
    }

    tmp && items.push(tmp);
    //code goes here.
    return { line: Math.min(line, options.lineClamp), items: items };
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.canvasMultilineText;
  }
})();
