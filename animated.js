(function( $ ) {
  $.fn.animated = function(animation, callback, options) {
    
    _this = this
    
    if (animation == 'stop' && this.data('current-animation')) {
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
      options.time = parseInt(options.duration.substring(0, options.duration.length - 1)) * 1000
      $.each(Animated.vendorPrefixFor('duration'), function(k, v) {
        _this.css(v, options.duration)
      })
    }
    
    if (options.delay) {
      $.each(Animated.vendorPrefixFor('delay'), function(k, v) {
        options.time += parseInt(options.delay.substring(0, options.delay.length - 1)) * 1000
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
    
    this.addClass("animated " + animation)
    
    
    if (!options.infinite) {
      setTimeout(function() {
        _this.removeClass('animated ' + animation)
        if (Animated.effects[animation] && Animated.effects[animation].hide == true) {
          _this.hide();
        };
        if (jQuery.isFunction(callback)) {
          callback.apply(null, [_this])
        };
      }, options.time)
    } else {
      this.data('current-animation', animation)
    }
  }
  
})( jQuery );

var Animated = {
  effects: {
    wiggle: {time: 300},
    wobble: {time: 300},
    fadeIn: {},
    fadeOut: {hide: true},
    fadeOutUp: {hide: true},
    fadeOutDown: {hide: true},
    fadeOutLeft: {hide: true},
    fadeOutRight: {hide: true},
    fadeOutUpBig: {hide: true, time: 200},
    fadeOutDownBig: {hide: true, time: 200},
    fadeOutLeftBig: {hide: true, time: 200},
    fadeOutRightBig: {hide: true, time: 200}
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