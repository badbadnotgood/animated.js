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
    
    if (!options) {
      options = {}
    }
    
    if (jQuery.isPlainObject(callback)) {
      options = callback
    };
    
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
    wobble: {time: 300},
    flash: {time: 300},
    bounce: {time: 300},
    shake: {time: 300},
    tada: {time: 300},
    swing: {time: 300},
    pulse: {time: 300},
    flip: {},
    flipInX: {show: true},
    flipOutX: {hide: true},
    flipInY: {show: true},
    flipOutY: {show: true},
    fadeIn: {show: true},
    fadeInUp: {show: true},
    fadeInDown: {show: true},
    fadeInLeft: {show: true},
    fadeInRight: {show: true},
    fadeInUpBig: {show: true},
    fadeInDownBig: {show: true},
    fadeInLeftBig: {show: true},
    fadeInRightBig: {show: true},
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
    rotateIn: {show: true},
    rotateInDownLeft: {show: true},
    rotateInDownRight: {show: true},
    rotateInUpLeft: {show: true},
    rotateInUpRight: {show: true},
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
  
  defaults: {
    time: 800,
    hide: false,
    show: false
  },
  
  vendorPrefixFor: function(name) {
    return $.map(['-webkit-animation-', '-moz-animation-', '-o-animation-', 'animation-'], function(n, i){
      return n + name
    })
  }
}