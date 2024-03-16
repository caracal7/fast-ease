# fast-ease.js

Fast and minimalistic javascript animation library

## Why?

Most animation libraries are overloaded with different functions and contain a lot of overhead, although in real life you often only need the ability to interpolate between two values, but at very high speed.
This library is intended to be a lower level layer for more complex animation engines.


## API

### Animate single value

```javascript
    const animationID = FastEase.animate(updateCallback, easingFunction, animationDuration, initialValue, finalValue, onDoneCallback);
```

### Animate single value

```javascript
    const animationID = FastEase.animateBatch(updateCallback, easingFunction, animationDuration, [
        [initialValue1, finalValue1],  
        [initialValue2, finalValue2]
        // ...
    ], onDoneCallback);
```

## Easing functions

- inBack
- inBounce
- inCirc
- inCube
- inElastic
- inExpo
- inOutBack
- inOutBounce
- inOutCirc
- inOutCube
- inOutElastic
- inOutExpo
- inOutQuad
- inOutQuart
- inOutQuint
- inOutSine
- inQuad
- inQuart
- inQuint
- inSine
- linear
- outBack
- outBounce
- outCirc
- outCube
- outElastic
- outExpo
- outQuad
- outQuart
- outQuint
- outSine

## Browser (IIFE)

```javascript
<!DOCTYPE html>
<html>
<head>
    <script src="fast-ease.min.js"></script>
</head>
<body>
    <button id="testSingle">Animate single value</button>
    <button id="testBatch" style="left:200px">Batch Animate "top" and "left"</button>

    <script>
        var ID1;
        var ID2;

        //  SINGLE VALUE

        document.getElementById('testSingle').onclick = event => {
            var rect = event.target.getBoundingClientRect();
            //  Stop the previous animation on this element, if any
            cancelAnimationFrame(ID1);
            //  Remember the animation ID and we can stop it at any time with it
            ID1 = FastEase.animate(
                //  Callback. Called when the value changes
                top => event.target.style.top = top + 'px',
                //  Easing function. You can use any of the 'FastEase.easings' or create your own.
                FastEase.easings.inOutQuad,
                //  Duration in milliseconds
                500,
                //  Initial value
                rect.top,
                //  Final value
                ~~(Math.random() * 300) + 1
            );
        };

        //  BATCH

        document.getElementById('testBatch').onclick = event => {
            var rect = event.target.getBoundingClientRect();
            //  Stop the previous animation on this element, if any
            cancelAnimationFrame(ID2);
            //  Remember the animation ID and we can stop it at any time with it
            ID2 = FastEase.animateBatch(
                //  Callback for first and second parameter in single batch. Called when the value changes
                (top, left) => {
                    event.target.style.top = top + 'px';
                    event.target.style.left = left + 'px';
                },
                //  Easing function. You can use any of the 'FastEase.easings' or create your own.
                FastEase.easings.inOutQuad,
                //  Duration in milliseconds
                500,
                //  Parameters batch
                [
                    [rect.top,  ~~(Math.random() * 300) + 1],  // first parameter (initial and final value)
                    [rect.left, ~~(Math.random() * 300) + 1]   // second parameter (initial and final value)
                    // ... next parameters
                ]
            );
        };
    </script>
</body>
</html>

```

## Node.js

### Installation

```
npm i fast-ease
```

## License
--------------

(The MIT License)

Copyright (c) 2024 Dmitrii Vasilev
