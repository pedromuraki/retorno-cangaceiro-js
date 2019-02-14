export const partialize = (fn, ...params) => {
  return fn.bind(null, ...params);
};

export const compose = (...fns) => (initial) => {
  return fns.reduceRight((acc, fn) => fn(acc), initial);
};

export const pipe = (...fns) => (initial) => {
  return fns.reduce((acc, fn) => fn(acc), initial);
};

export const takeUntil = (times, fn) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  () => {
    if (times-- > 0) fn();
  };
// export const takeUntil = (times, fn) => () => times-- > 0 && fn();

export const debounceTime = (miliseconds, fn) => {
  let timer = 0;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, miliseconds);
  };
};
