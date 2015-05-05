# react-native-tween-animation

A simple react native state tween animation module.

### Usage

```javascript
var tween = new Tween({

  // Start state
  start: {
    top: this.state.position.top,
    left: this.state.position.left
  },

  // End state
  end: {
    top: 0,
    left: 0
  },

  // Animation duration
  duration: 500,

  // Tween function
  tween: 'easeOutBack',

  // Update the component's state each frame
  frame: (tweenFrame) => {
    this.setState({
      position: tweenFrame
    });
  },

  // Optional callback
  done: () => {

    console.log('All done!');

    // Optionally
    this.tween.reverse(() => {});
  }
});
```
