# fast-ease.js

Fast and minimalistic javascript animation library.

## Why?

Most animation libraries are overloaded with different functions and contain a lot of overhead, although in real life you often only need the ability to interpolate between two values, but at very high speed.

Designed to be a lower level layer for more complex animation engines, this library **do one thing and do it well**.

## API

### FastEase.animate()

Animation of single value

```javascript
    const animation = new FastEase.animate(
        updateCallback,     // (interpolatedValue) => {};
        easingFunction,     // FastEase.easings.inOutElastic;
        animationDuration,  // 3000
        initialValue,       // -100
        finalValue,         // 100
        onDoneCallback      // () => {}
    );
```

### FastEase.animateBatch1()

Animation of multiple values using the same easing function and duration in a single loop

```javascript
    const animation = new FastEase.animateBatch1(
        updateCallback,     // ([interpolatedValue1, interpolatedValue2, ...]) => {};
        easingFunction,     // FastEase.easings.inOutElastic;
        animationDuration,  // 3000
        [
            [initialValue1, finalValue1],  // [-100, 100]
            [initialValue2, finalValue2]   // [1, 10]
            // ...
        ],
        onDoneCallback      // () => {}
    );
```

### FastEase.animateBatch2()

Animation of multiple values with different easing functions and durations in a single loop.

**onDoneCallback** is called after the longer animation has finished

```javascript
    const animation = new FastEase.animateBatch2(
        updateCallback,     // ([interpolatedValue1, interpolatedValue2, ...]) => {};
        [
            [easingFunction1, animationDuration1, initialValue1, finalValue1],  // [FastEase.easings.inOutElastic, 3000, -100, 100]
            [easingFunction2, animationDuration2, initialValue2, finalValue2]   // [FastEase.easings.inOutElastic, 1000, 1, 10]
            // ...
        ],
        onDoneCallback      // () => {}
    );
```

### Stop single or batch animation

```javascript
    animation.stop();
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
        #testSingle, #testBatch1, #testBatch2, #testStop {
            position: absolute;
            width: 160px;
            height: 40px;
            font-size: 10px;
            color: black;
            background: linear-gradient(#00FF8A, #00E050);
            padding: 0 7px;
            border: none;
            border-radius: 5px;
            box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.1), inset -1px -1px 0 rgba(0, 0, 0, 0.1);
            cursor: pointer;
            z-index: 100;
            font-weight: bold;
        }
        #testBatch1 {
            background: linear-gradient(#00baff, #0082e0);
        }
        #testBatch2 {
            background: linear-gradient(#baff00, #82e000);
        }
        #testStop {
            background: linear-gradient(#ff8200, #e08d00);
        }
    </style>
</head>
<body>
    <button id="testSingle" style="top:20px;left:20px;">FastEase.animate()</button>
    <button id="testBatch1" style="top:62px;left:20px;">FastEase.animateBatch1()</button>
    <button id="testBatch2" style="top:104px;left:20px;">FastEase.animateBatch2()</button>
    <button id="testStop" style="top:146px;left:20px;">animation.stop()</button>

    <script>
        var ANIM1;
        var ANIM2;
        var ANIM3;

        function Stop() {
            //  Stop all animations
            if(ANIM1) ANIM1.stop();
            if(ANIM2) ANIM2.stop();
            if(ANIM3) ANIM3.stop();
        }

        function testSingle(event) {
            //  Stop the previous animation on this element, if any
            if(ANIM1) ANIM1.stop();
            //  Remember the animation ID and we can stop it at any time with it
            ANIM1 = new FastEase.animate(
                //  Callback. Called when the value changes
                top => event.target.style.top = top + 'px',
                //  Easing function. You can use any of the 'FastEase.easings' or create your own.
                FastEase.easings.inOutElastic,
                //  Duration in milliseconds
                2000,
                //  Initial value
                Number(event.target.style.top.slice(0, -2)),
                //  Final value
                ~~(Math.random() * 600) - 300,
                //  Callback on animation finished
                () => console.log('Animation finished')
            );
        }

        function testBatch1(event) {
            //  Stop the previous animation on this element, if any
            if(ANIM2) ANIM2.stop();
            //  Remember the animation ID and we can stop it at any time with it
            ANIM2 = new FastEase.animateBatch1(
                //  Callback for first and second parameter in single batch. Called when the value changes
                ([ top, left ]) => {
                    event.target.style.top = top + 'px';
                    event.target.style.left = left + 'px';
                },
                //  Easing function. You can use any of the 'FastEase.easings' or create your own.
                FastEase.easings.outBounce,
                //  Duration in milliseconds
                3500,
                //  Parameters batch
                [
                    [Number(event.target.style.top.slice(0, -2)),  ~~(Math.random() * 300)],  // first parameter (initial and final value)
                    [Number(event.target.style.left.slice(0, -2)), ~~(Math.random() * 300)]   // second parameter (initial and final value)
                    // ... next parameters
                ],
                //  Callback on animation finished
                () => console.log('Animation finished')
            );
        };

        function testBatch2(event) {
            //  Stop the previous animation on this element, if any
            if(ANIM3) ANIM3.stop();


            var lastRotate = Number(event.target.style.transform.slice(0, -4).slice(7));
            if(lastRotate > 358) lastRotate = 0;

            //  Remember the animation ID and we can stop it at any time with it
            ANIM3 = new FastEase.animateBatch2(
                //  Callback for first and second parameter in single batch. Called when the value changes
                ([ top, left, rotate ]) => {
                    event.target.style.top = top + 'px';
                    event.target.style.left = left + 'px';
                    event.target.style.transform = `rotate(${rotate}deg)`;
                },
                //  Parameters batch
                [
                    [FastEase.easings.outBounce, 1000, Number(event.target.style.top.slice(0,-2)),  ~~(Math.random() * 300)],   // Easing, duration, from, to
                    [FastEase.easings.inBounce,  3000, Number(event.target.style.left.slice(0, -2)), ~~(Math.random() * 300)],  // Easing, duration, from, to
                    [FastEase.easings.inBounce,  6000, lastRotate, 360] // Easing, duration, from, to
                    // ... next parameters
                ],//)
                //  Callback on animation finished
                () => console.log('Animation finished')
            );
        };

        document.getElementById('testStop').onclick = Stop;
        document.getElementById('testSingle').onclick = testSingle;
        document.getElementById('testBatch1').onclick = testBatch1;
        document.getElementById('testBatch2').onclick = testBatch2;
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
