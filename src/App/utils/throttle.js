export const throttle = (fn, wait = 50) => {
    let timeout = null;
    const ctx = this;
    return (...args) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn.apply(ctx, args);
      }, wait);
    };
  };