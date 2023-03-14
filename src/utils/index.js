export function debounce(fn, time) {
  let timer = null;
  return function (...arg) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn.bind(this, ...arg), time);
  };
}

export function throttle(fn, time) {
  let timer = null;
  return function (...arg) {
    if (timer !== null) {
      return;
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(this, arg);
    }, time);
  };
}

export function getQueryString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
