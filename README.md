# fast-ease.js

Fast and minimalistic javascript animation library.

## Why?

Most animation libraries are overloaded with different functions and contain a lot of overhead, although in real life you often only need the ability to interpolate between two values, but at very high speed.

Designed to be a lower level layer for more complex animation engines, this library **do one thing and do it well**.

## API

### Animate single value

```javascript
    const animationID = FastEase.animate(
        updateCallback,     // interpolatedValue => {};
        easingFunction,     // FastEase.inOutElastic;
        animationDuration,  // 3000
        initialValue,       // -100
        finalValue,         // 100
        onDoneCallback      // animationID => {}
    );
```

### Animate multiple values in a single loop

```javascript
    const animationID = FastEase.animateBatch(
        updateCallback,     // (...interpolated) => {};
        easingFunction,     // FastEase.inOutElastic;
        animationDuration,  // 3000
        [
            [initialValue1, finalValue1],  // [-100, 100]
            [initialValue2, finalValue2]   // [1, 10]
            // ...
        ],
        onDoneCallback      // animationID => {}
    );
```

### Stop single or batch animation

```javascript
    FastEase.stop(animationID);
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
    <style>
        body {
            background: #444;
        }
        #testSingle, #testBatch, #testStop {
            position: absolute;
            width: 160px;
            height: 30px;
            top: 180px;
            left: calc(50% - 80px);

            font-size: 10px;
            color: black;
            background: linear-gradient(#00FF8A, #00E050);
            padding: 0 7px;
            border: 1px solid black;
            border-radius: 5px;
            box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.1), inset -1px -1px 0 rgba(0, 0, 0, 0.1);
            cursor: pointer;
        }
        #testBatch {
            top: 210px;
            background: linear-gradient(#00baff, #0082e0);
        }
        #testStop {
            top: 240px;
            background: linear-gradient(#ff8200, #e08d00);
        }
    </style>
</head>
<body>
    <button id="testSingle">Animate single value</button>
    <button id="testBatch">Batch animate "top" and "left"</button>
    <button id="testStop">Stop all animations</button>

    <script>
        var ID1;
        var ID2;

        function Stop() {
            //  Stop all animations
            FastEase.stop(ID1);
            FastEase.stop(ID2);
        }

        function testSingle(event) {
            var rect = event.target.getBoundingClientRect();
            //  Stop the previous animation on this element, if any
            FastEase.stop(ID1);
            //  Remember the animation ID and we can stop it at any time with it
            ID1 = FastEase.animate(
                //  Callback. Called when the value changes
                top => event.target.style.top = top + 'px',
                //  Easing function. You can use any of the 'FastEase.easings' or create your own.
                FastEase.easings.inOutElastic,
                //  Duration in milliseconds
                1500,
                //  Initial value
                rect.top,
                //  Final value
                ~~(Math.random() * 300) + 1,
                //  Callback on animation finished
                id => console.log('Animation finished', id)
            );
        }

        function testBatch(event) {
            var rect = event.target.getBoundingClientRect();
            //  Stop the previous animation on this element, if any
            FastEase.stop(ID1);
            //  Remember the animation ID and we can stop it at any time with it
            ID2 = FastEase.animateBatch(
                //  Callback for first and second parameter in single batch. Called when the value changes
                (top, left) => {
                    event.target.style.top = top + 'px';
                    event.target.style.left = left + 'px';
                },
                //  Easing function. You can use any of the 'FastEase.easings' or create your own.
                FastEase.easings.outBounce,
                //  Duration in milliseconds
                1500,
                //  Parameters batch
                [
                    [rect.top,  ~~(Math.random() * 300) + 1],  // first parameter (initial and final value)
                    [rect.left, ~~(Math.random() * 300) + 1]   // second parameter (initial and final value)
                    // ... next parameters
                ],
                //  Callback on animation finished
                id => console.log('Animation finished', id)
            );
        };

        document.getElementById('testStop').onclick = Stop;
        document.getElementById('testSingle').onclick = testSingle;
        document.getElementById('testBatch').onclick = testBatch;
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
