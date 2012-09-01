animated.js
===========

`animated.js` is a jQuery wrapper for Dan Eden's wonderful "animate.css", supports callbacks and customization.  Animated.js is incredibly easy to use and works on all modern browsers.

##Usage

To use animated.js simply include it in the `<head>` of your document and dynamically trigger the animation by using this function:
  
```
$('#element').animated('animation')
```

##Advanced

`animated.js` fully supports callbacks and customization of each animation even if its performed on the same element.  When using an animation that fades the element in or out it will show / hide the actual element at the end of animation.  To access the advanced options simply supply an object, function, or both as parameters when you call the animated function.

```
$('#element').animated('animation', 
  function() {}, // Callback
  { duration: '1s', // Also supports floating point, make sure you include s
    delay: '1s', // Delay before the animation is started, once again please include an s
    iterationCount: 10 // How many iterations of the animation before it stops,
    infinite: false // For animations that don't show or hide the element, you can animate them infinitely
})

// You can also just supply options or just supply a callback

$('#element').animated('animation', {})
$('#element').animated('animation', function() {})
```

####Infinite Animations

If you want to animate something indefinitely just set `infinite: true` in the options hash.  If you want to stop the animation (lets say on a user action) simply do this:

```
$('#element').animated(false)
```

####Extending animate.js

If you want to write your own animations and execute them through animated.js you can by adding this function to the `<head>` of your document.
  
```
Animated.extend('animationName', {
  time: 800, // Duration of the animation
  show: true, // Show the element while animating?
  hide: true // Hide the element after animating?
})

// You can also supply a hash of multiple animations

Animated.extend({
  animationOne: {},
  animationTwo: {}
})
```

##Animation Names
####Attention seekers:
flash
bounce
shake
tada
swing
wobble
wiggle
pulse

####Flippers (currently Webkit, Firefox, &amp; IE10 only):
flip
flipInX
flipOutX
flipInY
flipOutY

####Fading entrances:
fadeIn
fadeInUp
fadeInDown
fadeInLeft
fadeInRight
fadeInUpBig
fadeInDownBig
fadeInLeftBig
fadeInRightBig

####Fading exits:
fadeOut
fadeOutUp
fadeOutDown
fadeOutLeft
fadeOutRight
fadeOutUpBig
fadeOutDownBig
fadeOutLeftBig
fadeOutRightBig

####Bouncing entrances:
bounceIn
bounceInDown
bounceInUp
bounceInLeft
bounceInRight

####Bouncing exits:
bounceOut
bounceOutDown
bounceOutUp
bounceOutLeft
bounceOutRight

####Rotating entrances:
rotateIn
rotateInDownLeft
rotateInDownRight
rotateInUpLeft
rotateInUpRight

####Rotating exits:
rotateOut
rotateOutDownLeft
rotateOutDownRight
rotateOutUpLeft
rotateOutUpRight

####Lightspeed:
lightSpeedIn
lightSpeedOut

####Specials:
hinge
rollIn
rollOut