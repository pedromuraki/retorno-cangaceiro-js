export const handleStatus = res => res.ok ? res.json() : Promise.reject(res.statusText);

export const log = (param) => {
  console.log(param);
  return param;
}

export const timeoutPromise = (promise, miliseconds) => {
  const timeout = new Promise((res, rej) => {
    setTimeout(() => rej(`Limite de tempo "${miliseconds} ms" excedido`), 200);
  });

  return Promise.race([promise, timeout]);
};

// eslint-disable-next-line arrow-parens
export const delay = miliseconds => data => {
  return new Promise((res) => {
    setTimeout(() => res(data), miliseconds);
  });
};

export const retry = (times, miliseconds, fn) => {
  return fn().catch((err) => {
    console.log(times);
    return delay(miliseconds)()
      .then(() => {
        return times > 1
          ? retry(--times, miliseconds, fn)
          : Promise.reject(err);
      });
  });
};
