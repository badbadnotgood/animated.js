animated.js
===========

`animated.js` is a CSS3 animation framework for jQuery, it comes loaded with a bunch of ready-go animations curtesy Dan Eden's animate.css (https://github.com/daneden/animate.css) and is super easy to use and customize.  By the way it's only 13kb minified!

You can view demos of the animations here: http://badbadnotgood.com/animated

##Usage

To use animated.js simply include it in the `<head>` of your document, thats it!  (Also ya gotta have jQuery).  You can run an animation like so:
  
```
$('#element').animated('animation')
```

And even pass it some complex options:

```
$('#element').animated('fadeIn', function() { alert("faded in!") }, {direction: 'up', delay: '2s', duration: '3s'})
```

##Advanced

`animated.js` fully supports callbacks and customization of each animation even if its performed on the same element.  When using an animation that fades the element in or out it will show / hide the actual element at the end of animation.  To access the advanced options simply supply an object, function, or both as parameters when you call the animated function.

```
$('#element').animated('animation', 
  function() {}, // Callback
  { duration: '1s', // Also supports floating point, make sure you include s (this is because of the css animation syntax)
    delay: '1s', // Delay before the animation is started, once again please include an s
    iterationCount: 10, // How many iterations of the animation before it stops,
    infinite: false, // For animations that don't show or hide the element, you can animate them infinitely
    direction: 'up', // Up / Down / Left / Right, only works on some animations
    axis: 'y' // y / x, works when the animation involves a flip
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

Writing your own animations has never been simpler!  Now you can create your own CSS3 animations that are cross-browser friendly by never even touching CSS.  Simply use the `Animated.animation()` feature and pass in your keyframes, see the example below:
  
```
Animated.animation('myNewAnimation', {
  keyframes: ["20% { transform: rotate(15deg); }", // Keyframes are automatically parsed with vendor prefixes
    "40% { transform: rotate(-10deg); }",
    "60% { transform: rotate(5deg); }",
    "80% { transform: rotate(-5deg); }",
    "100% { transform: rotate(0deg); }"
  ],
  attributes: {
    'transform-origin': 'top center' // These are additional attributes that are not part of the keyframes
  },
  options: {
    time: 800, // Amount of time in milliseconds the animation will take, defaults to 1 second
    hide: true // Hide the element after animation?
  }
})
```

Now with this example you can call your custom animation anytime you want and extend it the way you would with any other animation!

```
$("#element").animated('myNewAnimation', {duration: '3s'})
```

Its that easy, no more `-moz-` && `-web-kit` prefixs, no more redundant (and large) CSS files... You can even specify your own directions and axis by appending `Up / Down / Left / Right` or `X / Y` to your animation name.  Example:

```
Animated.animation('myNewAnimationX', {
  // Your keyframes and options etc here
})

// You can now call this specific axis with:
$("#element").animated("myNewAnimation", {axis: 'x'})
```

##Example

You can view the animations in action here: http://badbadnotgood.com/animated

Here is an example where the div will fadeOut when the link is clicked and display an alert message.

```
<div id ="element">
</div>

<a href="#" onclick="$('#element').animated('fadeOut', function() { alert('Faded out!')}, {duration: '3s'})">
```

##Animation Names
####Attention seekers:
```
flash
bounce
shake
tada
swing
wobble
wiggle
pulse
```

####Flippers (currently Webkit, Firefox, &amp; IE10 only):
```
flip
flipIn
flipOut

Note: you can supply X or Y in the axis option with these animations
```

####Fading entrances:
```
fadeIn

Note: you can supply Up / Down / Left / Right in the direction option with these animations
```

####Fading exits:
```
fadeOut

Note: you can supply Up / Down / Left / Right in the direction option with these animations
```

####Bouncing entrances:
```
bounceIn

Note: you can supply Up / Down / Left / Right in the direction option with these animations
```

####Bouncing exits:
```
bounceOut

Note: you can supply Up / Down / Left / Right in the direction option with these animations
```

####Specials:
```
hinge
rollIn
rollOut
```