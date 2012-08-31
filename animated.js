(function( $ ) {
  $.fn.animated = function(animation, callback, options) {
    
    if (!options) {
      options = {}
    }
    
    if (jQuery.isPlainObject(callback)) {
      options = callback
    };
    
    if (!options.time) {
      options.time = Animated.effects[animation].time ? Animated.effects[animation] : Animated.defaults.time
    }
    
    _this = this
    
    if (options.duration) {
      $.each(Animated.vendorPrefixFor('duration'), function() {
        _this.css(this, options.duration)
      })
    };
    
    this.addClass("animated " + animation)
    
    setTimeout(function() {
      _this.removeClass('animated ' + animation)
      if (Animated[animation] && Animated[animation].hide == true) {
        _this.hide();
      };
      if (jQuery.isFunction(callback)) {
        callback.apply(null, [_this])
      };
    }, options.time)

  }
  
})( jQuery );

var Animated = {
  effects: {
    wiggle: {},
    wobble: {},
    fade: {hide: true}
  },
  
  defaults: {
    time: 300,
    hide: false,
    show: false
  },
  
  vendorPrefixFor: function(name) {
    return $.map(['-webkit-animation-', '-moz-animation-', '-o-animation-', 'animation-'], function(n, i){
      return n + name
    })
  }
}