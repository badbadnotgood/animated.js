/**
 * Animated.js By Matthew A. Tavares
 * See https://github.com/badbadnotgood/animated.js for documentation
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


(function( $ ) {
  $.fn.animated = function(animation, callback, options) {
    
    _this = this
    
    if (animation == 'stop' || animation == false && this.data('current-animation')) {
      $.each(Animated.vendorPrefixFor('iteration-count'), function(k, v) {
        _this.css(v, '1')
      })
      this.removeClass('animated ' + this.data('current-animation'))
      this.removeData('current-animation')
      if (jQuery.isFunction(callback)) {
        callback.apply(null, [this])
      };
      return;
    };
    
    if (!options) options = {} 
    if (jQuery.isPlainObject(callback)) options = callback
    if (options.axis) animation = animation + options.axis.toUpperCase()
    if (options.direction) animation += options.direction.charAt(0).toUpperCase() + options.direction.slice(1);
    
    if (!options.time) {
      options.time = Animated.effects[animation].time ? Animated.effects[animation].time : Animated.defaults.time
    }
    
    if (options.duration) {
      // Convert duration to milliseconds for timeout
      options.time = parseFloat(options.duration.substring(0, options.duration.length - 1)) * 1000
      $.each(Animated.vendorPrefixFor('duration'), function(k, v) {
        _this.css(v, options.duration)
      })
    }
    
    if (options.delay) {
      $.each(Animated.vendorPrefixFor('delay'), function(k, v) {
        options.time += parseFloat(options.delay.substring(0, options.delay.length - 1)) * 1000
        _this.css(v, options.delay)
      })
    };
    
    if (options.iterationCount || options.infinite == true) {
      options.iterationCount = options.infinite ? 'infinite' : options.iterationCount
      $.each(Animated.vendorPrefixFor('iteration-count'), function(k, v) {
        _this.css(v, options.iterationCount)
      })
      if (options.iterationCount == 'infinite') {
        options.infinite = true
      };
    };
    
    if (Animated.effects[animation].show) {
      // It gets a little tricky with true show / hiding elements because the effect doesn't change the opacity
      this.animated('fadeOut', function() { _this.show(); _this.addClass("animated " + animation)}, {duration: '0.1s'})
    } else {
      this.addClass("animated " + animation)
    }
     
    if (!options.infinite) {
      setTimeout(function() {
        _this.removeClass('animated ' + animation)
        if (Animated.effects[animation] && Animated.effects[animation].hide == true) {
          _this.hide()
        }
        if (Animated.effects[animation] && Animated.effects[animation].show == true) {
          _this.show()
        }
        
        // Remove duration, delay and iteration so we can customize the same element another time
        $.each(['duration', 'delay', 'iteration-count'], function(i, type) {
          $.each(Animated.vendorPrefixFor(type), function(k, v) {
            _this.css(v, '')
          })
        })
        
        if (jQuery.isFunction(callback)) {
          callback.apply(null, [_this])
        }
      }, options.time)
    } else {
      this.data('current-animation', animation)
    }
  }
  
  return this
  
})( jQuery );

var Animated = {
  effects: {
    wiggle: {time: 300},
    wobble: {time: 800},
    flash: {time: 800},
    bounce: {time: 1000},
    shake: {time: 300},
    tada: {time: 800},
    swing: {time: 800},
    pulse: {time: 800},
    flip: {},
    flipInX: {show: true},
    flipOutX: {hide: true},
    flipInY: {show: true},
    flipOutY: {hide: true},
    fadeIn: {show: true},
    fadeInUp: {show: true},
    fadeInDown: {show: true},
    fadeInLeft: {show: true},
    fadeInRight: {show: true},
    fadeInUpBig: {show: true, time: 1000},
    fadeInDownBig: {show: true, time: 1000},
    fadeInLeftBig: {show: true, time: 1000},
    fadeInRightBig: {show: true, time: 1000},
    fadeInUp: {show: true},
    fadeOut: {hide: true},
    fadeOutUp: {hide: true},
    fadeOutDown: {hide: true},
    fadeOutLeft: {hide: true},
    fadeOutRight: {hide: true},
    fadeOutUpBig: {hide: true, time: 200},
    fadeOutDownBig: {hide: true, time: 200},
    fadeOutLeftBig: {hide: true, time: 200},
    fadeOutRightBig: {hide: true, time: 200},
    bounceIn: {show: true},
    bounceInDown: {show: true},
    bounceInUp: {show: true},
    bounceInLeft: {show: true},
    bounceInRight: {show: true},
    bounceOut: {hide: true},
    bounceOutDown: {hide: true},
    bounceOutUp: {hide: true},
    bounceOutLeft: {hide: true},
    bounceOutRight: {hide: true},
    rotateIn: {show: true, time: 1000},
    rotateInDownLeft: {show: true, time: 1000},
    rotateInDownRight: {show: true, time: 1000},
    rotateInUpLeft: {show: true, time: 1000},
    rotateInUpRight: {show: true, time: 1000},
    rotateOut: {hide: true},
    rotateOutDownLeft: {hide: true},
    rotateOutDownRight: {hide: true},
    rotateOutUpLeft: {hide: true},
    rotateOutUpRight: {hide: true},
    lightSpeedIn: {show: true, time: 800},
    lightSpeedOut: {hide: true, time: 300},
    hinge: {hide: true, time: 2000},
    rollIn: {show: true, time: 1000},
    rollOut: {hide: true}
  },
  
  effect: {
    wobble: {
      keyframes: ["0% { transform: translateX(0%); }", 
        "15% { transform: translateX(-25%) rotate(-5deg); }", 
        "30% { transform: translateX(20%) rotate(3deg); }",
        "45% { transform: translateX(-15%) rotate(-3deg); }",
        "60% { transform: translateX(10%) rotate(2deg); }",
        "75% { transform: translateX(-5%) rotate(-1deg); }",
        "100% { transform: translateX(0%); }" 
      ], 
    },
    
    pulse: {
      keyframes: ["0% { transform: scale(1); }",
        "50% { transform: scale(1.1); }",
        "100% { transform: scale(1); }"
      ]
    },
    
    swing: {
      keyframes: ["20% { transform: rotate(15deg); }",
        "40% { transform: rotate(-10deg); }",
        "60% { transform: rotate(5deg); }",
        "80% { transform: rotate(-5deg); }",
        "100% { transform: rotate(0deg); }"
      ],
      attributes: {
        'transform-origin': 'top center'
      }
    },
    
    wiggle: {
      keyframes: ["0% { transform: skewX(9deg); }",
        "10% { transform: skewX(-8deg); }",
        "20% { transform: skewX(7deg); }",
        "30% { transform: skewX(-6deg); }",
        "40% { transform: skewX(5deg); }",
        "50% { transform: skewX(-4deg); }",
        "60% { transform: skewX(3deg); }",
        "70% { transform: skewX(-2deg); }",
        "80% { transform: skewX(1deg); }",
        "90% { transform: skewX(0deg); }",
        "100% { transform: skewX(0deg); }"
      ],
      attributes: {
        'animation-timing-function': 'ease-in'
      }
    },
    
    bounceIn: {
      keyframes: ["0% { transform: scale(.3); opacity: 0; }",
      	"50% { transform: scale(1.05); opacity: 1; }",
        "70% { transform: scale(.9); }",
        "100% { transform: scale(1); }"
      ]
    },
    
    bounceInUp: {
      keyframes: [
        "0% { opacity: 0; transform: translateY(2000px); }",
        "60% { opacity: 1; transform: translateY(-30px); }",
        "80% { transform: translateY(10px); }",
      	"100% { transform: translateY(0); }"
      ]
    },
    
    bounceInDown: {
      keyframes: ["0% { opacity: 0; transform: translateY(-2000px); }",
      	"60% { opacity: 1; transform: translateY(30px); }",
      	"80% { transform: translateY(-10px); }",
      	"100% { transform: translateY(0); }"
      ]
    },
    
    bounceInLeft: {
      keyframes: ["0% { opacity: 0; transform: translateX(-2000px); }",
      	"60% { opacity: 1; transform: translateX(30px); }",
      	"80% { transform: translateX(-10px); }",
        "100% { transform: translateX(0);}"
      ]
    },
    
    bounceInRight: {
      keyframes: ["0% { opacity: 0; transform: translateX(2000px); }",
      	"60% { opacity: 1; transform: translateX(-30px); }",
      	"80% { transform: translateX(10px); }",
      	"100% { transform: translateX(0); }"
      ]
    },
    
    bounceOut: {
      keyframes: ["0% { transform: scale(1); }",
      	"25% { transform: scale(.95); }",
      	"50% { opacity: 1; transform: scale(1.1); }",
      	"100% { opacity: 0; transform: scale(.3); }"
      ]
    },
    
    bounceOutUp: {
      keyframes: ["0% { transform: translateY(0); }",
      	"20% { opacity: 1; transform: translateY(20px); }",
      	"100% { opacity: 0; transform: translateY(-2000px); }"
      ]
    },
    
    bounceOutDown: {
      keyframes: ["0% { transform: translateY(0); }",
        "20% { opacity: 1; transform: translateY(-20px); }",
      	"100% { opacity: 0; transform: translateY(2000px); }"
      ]
    },
    
    bounceOutLeft: {
      keyframes: ["0% { transform: translateX(0); }",
      	"20% { opacity: 1; transform: translateX(20px); }",
      	"100% { opacity: 0; transform: translateX(-2000px); }"
      ]
    },
    
    bounceOutRight: {
      keyframes: ["0% { transform: translateX(0); }",
      	"20% { opacity: 1; transform: translateX(-20px); }",
      	"100% { opacity: 0; transform: translateX(2000px); }"
      ]
    },
    
    rollIn: {
      keyframes: ["0% { opacity: 0; transform: translateX(-100%) rotate(-120deg); }",
      	"100% { opacity: 1; transform: translateX(0px) rotate(0deg); }"
      ]
    },
    
    rollOut: {
      keyframes: ["0% { opacity: 1; transform: translateX(0px) rotate(0deg); }",
        "100% { opacity: 0; transform: translateX(100%) rotate(120deg); }"
      ]
    },
    
    flash: {
      keyframes: {
        0: 'opacity: 1',
        25: 'opacity: 0',
        50: 'opacity: 1',
        75: 'opacity: 0',
        100: 'opacity: 1'
      }
    },
    
    shake: {
      keyframes: ["0%, 100% { transform: translateX(0); }",
      	"10%, 30%, 50%, 70%, 90% { transform: translateX(-10px);}",
      	"20%, 40%, 60%, 80% { transform: translateX(10px);}"
      ]
    },
    
    bounce: {
      keyframes: ["0%, 20%, 50%, 80%, 100% { transform: translateY(0);}",
    	  "40% { transform: translateY(-30px);}",
    	  "60% { transform: translateY(-15px);}"
      ]
    },
    
    tada: {
      keyframes: ["0% { transform: scale(1);}",
      	"10%, 20% { transform: scale(0.9) rotate(-3deg);}",
      	"30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg);}",
      	"40%, 60%, 80% { transform: scale(1.1) rotate(-3deg);}",
      	"100% { transform: scale(1) rotate(0);}"
      ]
    },
    
    flip: {
      keyframes: ["0% { transform: perspective(400px) rotateY(0); animation-timing-function: ease-out; }",
        "40% { transform: perspective(400px) translateZ(150px) rotateY(170deg); animation-timing-function: ease-out; }",
        "50% { transform: perspective(400px) translateZ(150px) rotateY(190deg) scale(1); animation-timing-function: ease-in; }",
        "80% { transform: perspective(400px) rotateY(360deg) scale(.95); animation-timing-function: ease-in; }",
        "100% { transform: perspective(400px) scale(1); animation-timing-function: ease-in; }"
      ],
      attributes: {
        'backface-visibility': 'visible !important'
      }
    },
    
    flipInX: {
      keyframes: ["0% { transform: perspective(400px) rotateX(90deg); opacity: 0; }",
        "40% { transform: perspective(400px) rotateX(-10deg); }",
        "70% { transform: perspective(400px) rotateX(10deg); }",
        "100% { transform: perspective(400px) rotateX(0deg); opacity: 1; }"
      ],
      attributes: {
        'backface-visibility': 'visible !important'
      }
    },
    
    flipOutX: {
      keyframes: ["0% { transform: perspective(400px) rotateX(0deg); opacity: 1; }",
        "100% { transform: perspective(400px) rotateX(90deg); opacity: 0; }"
      ],
      attributes: {
        'backface-visibility': 'visible !important'
      }
    },
    
    flipInY: {
      keyframes: ["0% { transform: perspective(400px) rotateY(90deg); opacity: 0; }",
        "40% { transform: perspective(400px) rotateY(-10deg); }",
        "70% { transform: perspective(400px) rotateY(10deg); } ",
        "100% { transform: perspective(400px) rotateY(0deg); opacity: 1; }"
      ],
      attributes: {
        'backface-visibility': 'visible !important'
      }
    },
    
    flipOutY: {
      keyframes: ["0% { transform: perspective(400px) rotateY(0deg); opacity: 1; }",
        "100% { transform: perspective(400px) rotateY(90deg); opacity: 0; }"
      ],
      attributes: {
        'backface-visibility': 'visible !important'
      }
    },
    
    fadeIn: {
      keyframes: {
        0: 'opacity: 0',	
      	100: 'opacity: 1'
      }
    },
    
    fadeInUp: {
      keyframes: ["0% { opacity: 0; transform: translateY(20px); }",
        "100% { opacity: 1; transform: translateY(0); }"
      ]
    },
    
    fadeInDown: {
      keyframes: ["0% { opacity: 0; transform: translateY(-20px); }",
        "100% { opacity: 1; transform: translateY(0); }"
      ]
    },
    
    fadeInLeft: {
      keyframes: ["0% { opacity: 0; transform: translateX(-20px); }",
        "100% { opacity: 1; transform: translateX(0); }"
      ]
    },
    
    fadeInRight: {
      keyframes: ["0% { opacity: 0; transform: translateX(20px); }",
        "100% { opacity: 1; transform: translateX(0); }"
      ]
    },
    
    fadeOut: {
      keyframes: ["0% {opacity: 1;}",
        "100% {opacity: 0;}"
      ]
    },
    
    fadeOutUp: {
      keyframes: ["0% { opacity: 1; transform: translateY(0); }",
        "100% { opacity: 0; transform: translateY(-20px); }"
      ]
    },
    
    fadeOutDown: {
      keyframes: ["0% { opacity: 1; transform: translateY(0); }",
      	"100% { opacity: 0; transform: translateY(20px); }"
      ]
    },
    
    fadeOutLeft: {
      keyframes: ["0% { opacity: 1; transform: translateX(0); }",
        "100% { opacity: 0; transform: translateX(-20px); }"
      ]
    },
    
    fadeOutRight: {
      keyframes: ["0% { opacity: 1; transform: translateX(0); }",
        "100% { opacity: 0; transform: translateX(20px); }"
      ]
    },
    
    hinge: {
      keyframes: ["0% { transform: rotate(0); transform-origin: top left; animation-timing-function: ease-in-out; }",
        "20%, 60% { transform: rotate(80deg); transform-origin: top left; animation-timing-function: ease-in-out; }",
        "40% { transform: rotate(60deg); transform-origin: top left; animation-timing-function: ease-in-out; }",
        "80% { transform: rotate(60deg) translateY(0); opacity: 1; transform-origin: top left; animation-timing-function: ease-in-out; }",
        "100% { transform: translateY(700px); opacity: 0; }"
      ],
      attributes: {
        'animation-duration': '2s'
      }
    }
  },
  
  defaults: {
    time: 1000,
    hide: false,
    show: false
  },
  
  _default: {
    'animation-duration': '1s',
    'animation-fill-mode': 'both'
  },
  
  style: null,
  
  vendorPrefixFor: function(name) {
    return $.map(['-webkit-animation-', '-moz-animation-', '-o-animation-', 'animation-'], function(n, i){
      return n + name
    })
  },
  
  _vendorPrefixForKeyFrames: function(name) {
    return $.map(['-webkit-', '-moz-', '-o-', ''], function(n, i){
      return n + name
    })
  },
  
  extend: function(name, hash) {
    if ($.isPlainObject(name)) {
      $.each(name, function(k, v) {
        this.effects[k] = v
      })
      return;
    }
    this.effects[name] = hash
  },
  
  keyframes: function(name, keyframes) {
    keys = $.map(['-webkit-', '-moz-', '-o-', ''], function(n, i) {
      c = "@" + n + "keyframes " + name
      rule = ""
      if ($.isPlainObject(keyframes)) {
        $.each(keyframes, function(k, v) {
          rule += k + "% " + "{ " + v + "; }\n"
        })
      } else {
        $.each(keyframes, function(v, k) {
          if (k.indexOf("animation") != -1) {
            k = k.splice(k.indexOf("animation"), 0, n)
          }
          if (k.indexOf("transform-origin") != -1) {
            k = k.splice(k.indexOf("transform-origin"), 0, n)
          }
          p = k.indexOf("transform")
          rule += k.splice(p, 0, n) + "\n"
        })
      }
      obj = {}
      obj[c] = rule
      return obj
    })
    return keys
  },
  
  animation: function(name, attr) {
    this.effect[name] = attr
    this.effects[name] = attr.options
  },
  
  _add: function(name, keyframes, attributes) {
    keys = this.keyframes(name, keyframes)
    $.each(keys, function(k, v) {
      $.each(v, function(a, b) {
        Animated._rule(a, b)
      })
    })
    c = this._createClass(name, attributes)
    $.each(c, function(k, v) {
      Animated._rule(k, v)
    })
  },
  
  _createClass: function(name, attributes) {
    c = "." + name
    rule = ""
    $.each(['-webkit-', '-moz-', '-o-', ''], function(k, v) {
      rule += v + "animation-name:" + name + ";"
      if ($.isPlainObject(attributes)) {
        $.each(attributes, function(attr_name, attr_value) {
          rule += v + attr_name + ":" + attr_value + ";"
        })
      }
    })
    obj = {}
    obj[c] = rule
    return obj
  },
  
  _rule: function(name, rule) {
    this.style.append(name + " { " + rule + " } \n")
  },
  
  load: function() {
    this.style = $('<style>', {
      type: 'text/css',
      rel: 'stylesheet',
      media: 'screen',
      id: 'test'
    })
    $("head").append(this.style)
    
    default_rule = ""
    $.each(['-webkit-', '-moz-', '-o-', ''], function(k, v) {
      $.each(Animated._default, function(a, b) {
        default_rule += v + a + ":" + b + ";"
      })
    })
    
   Animated._rule('.animated', default_rule)
    
    $.each(this.effect, function(k, v) {
      Animated._add(k, v.keyframes, v.attributes)
    })
  },
}

$(document).ready(function() {
  Animated.load()
})

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};