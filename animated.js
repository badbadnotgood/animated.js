(function( $ ) {
  $.fn.animated = function(animation, callback, options) {
    
    if (!options) {
      options = {}
    }
    
    if (!options.time) {
      options.time = Animated.effects[animation].time ? Animated.effects[animation] : Animated.defaults.time
    }
    
    this.addClass("animated " + animation)
    _this = this
    setTimeout(function() {
      _this.removeClass('animated ' + animation)
      if (Animated[animation] && Animated[animation].hide == true) {
        _this.hide();
      };
      if (callback) {
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
  }
}