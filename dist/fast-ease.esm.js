// src/index.js
var running = {};
var finish = {};
var id = 0;
var animate = (callback, ease, duration = 1e3, from, to, done) => {
  id++;
  var start = performance.now();
  var end = start + duration;
  done && (finish[id] = done);
  function frame(now) {
    var delta = now - start;
    if (delta >= duration)
      return cancelAnimationFrame(running[id]) || delete running[id] && delete finish[id] && done && done(id);
    callback(from + (to - from) * ease(delta / duration));
    running[id] = requestAnimationFrame(frame);
  }
  running[id] = requestAnimationFrame(frame);
  return id;
};
var animateBatch = (callback, ease, duration = 1e3, batch, done) => {
  id++;
  var start = performance.now();
  var end = start + duration;
  var interpolated = new Array(batch[0].length);
  done && (finish[id] = done);
  function frame(now) {
    var delta = now - start;
    if (delta >= duration)
      return cancelAnimationFrame(running[id]) || delete running[id] && delete finish[id] && done && done(id);
    var easing = ease(delta / duration);
    batch.forEach((value, index) => interpolated[index] = value[0] + (value[1] - value[0]) * easing);
    callback(...interpolated);
    running[id] = requestAnimationFrame(frame);
  }
  running[id] = requestAnimationFrame(frame);
  return id;
};
var stop = (id2) => {
  cancelAnimationFrame(running[id2]);
  delete running[id2];
  if (finish[id2]) {
    var done = finish[id2];
    delete finish[id2];
    done(id2);
  }
};
var easings = {};
easings.linear = function(n) {
  return n;
};
easings.inQuad = function(n) {
  return n * n;
};
easings.outQuad = function(n) {
  return n * (2 - n);
};
easings.inOutQuad = function(n) {
  n *= 2;
  if (n < 1)
    return 0.5 * n * n;
  return -0.5 * (--n * (n - 2) - 1);
};
easings.inCube = function(n) {
  return n * n * n;
};
easings.outCube = function(n) {
  return --n * n * n + 1;
};
easings.inOutCube = function(n) {
  n *= 2;
  if (n < 1)
    return 0.5 * n * n * n;
  return 0.5 * ((n -= 2) * n * n + 2);
};
easings.inQuart = function(n) {
  return n * n * n * n;
};
easings.outQuart = function(n) {
  return 1 - --n * n * n * n;
};
easings.inOutQuart = function(n) {
  n *= 2;
  if (n < 1)
    return 0.5 * n * n * n * n;
  return -0.5 * ((n -= 2) * n * n * n - 2);
};
easings.inQuint = function(n) {
  return n * n * n * n * n;
};
easings.outQuint = function(n) {
  return --n * n * n * n * n + 1;
};
easings.inOutQuint = function(n) {
  n *= 2;
  if (n < 1)
    return 0.5 * n * n * n * n * n;
  return 0.5 * ((n -= 2) * n * n * n * n + 2);
};
easings.inSine = function(n) {
  return 1 - Math.cos(n * Math.PI / 2);
};
easings.outSine = function(n) {
  return Math.sin(n * Math.PI / 2);
};
easings.inOutSine = function(n) {
  return 0.5 * (1 - Math.cos(Math.PI * n));
};
easings.inExpo = function(n) {
  return 0 == n ? 0 : Math.pow(1024, n - 1);
};
easings.outExpo = function(n) {
  return 1 == n ? n : 1 - Math.pow(2, -10 * n);
};
easings.inOutExpo = function(n) {
  if (0 == n)
    return 0;
  if (1 == n)
    return 1;
  if ((n *= 2) < 1)
    return 0.5 * Math.pow(1024, n - 1);
  return 0.5 * (-Math.pow(2, -10 * (n - 1)) + 2);
};
easings.inCirc = function(n) {
  return 1 - Math.sqrt(1 - n * n);
};
easings.outCirc = function(n) {
  return Math.sqrt(1 - --n * n);
};
easings.inOutCirc = function(n) {
  n *= 2;
  if (n < 1)
    return -0.5 * (Math.sqrt(1 - n * n) - 1);
  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
};
easings.inBack = function(n) {
  var s = 1.70158;
  return n * n * ((s + 1) * n - s);
};
easings.outBack = function(n) {
  var s = 1.70158;
  return --n * n * ((s + 1) * n + s) + 1;
};
easings.inOutBack = function(n) {
  var s = 1.70158 * 1.525;
  if ((n *= 2) < 1)
    return 0.5 * (n * n * ((s + 1) * n - s));
  return 0.5 * ((n -= 2) * n * ((s + 1) * n + s) + 2);
};
easings.inBounce = function(n) {
  return 1 - easings.outBounce(1 - n);
};
easings.outBounce = function(n) {
  if (n < 1 / 2.75) {
    return 7.5625 * n * n;
  } else if (n < 2 / 2.75) {
    return 7.5625 * (n -= 1.5 / 2.75) * n + 0.75;
  } else if (n < 2.5 / 2.75) {
    return 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375;
  } else {
    return 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
  }
};
easings.inOutBounce = function(n) {
  if (n < 0.5)
    return easings.inBounce(n * 2) * 0.5;
  return easings.outBounce(n * 2 - 1) * 0.5 + 0.5;
};
easings.inElastic = function(n) {
  var s, a = 0.1, p = 0.4;
  if (n === 0)
    return 0;
  if (n === 1)
    return 1;
  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else
    s = p * Math.asin(1 / a) / (2 * Math.PI);
  return -(a * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p));
};
easings.outElastic = function(n) {
  var s, a = 0.1, p = 0.4;
  if (n === 0)
    return 0;
  if (n === 1)
    return 1;
  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else
    s = p * Math.asin(1 / a) / (2 * Math.PI);
  return a * Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1;
};
easings.inOutElastic = function(n) {
  var s, a = 0.1, p = 0.4;
  if (n === 0)
    return 0;
  if (n === 1)
    return 1;
  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else
    s = p * Math.asin(1 / a) / (2 * Math.PI);
  if ((n *= 2) < 1)
    return -0.5 * (a * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p));
  return a * Math.pow(2, -10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p) * 0.5 + 1;
};
var src_default = {
  animate,
  animateBatch,
  stop,
  easings
};
export {
  animate,
  animateBatch,
  src_default as default,
  easings,
  stop
};
