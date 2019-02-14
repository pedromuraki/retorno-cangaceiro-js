import { log, timeoutPromise, retry } from './utils/promise-helpers.js';
import { notasService as service } from './nota/service.js';
import { pipe, partialize, takeUntil, debounceTime } from './utils/operators.js'

const action = () => {
  retry(3, 3000, () => timeoutPromise(service.sumItems('2143'), 200))
    .then(total => log(total))
    .catch(err => log(err));
};

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
)(action);

// const action = debounceTime(500,
//   takeUntil(3, () => {
//     service.sumItems('2143')
//       .then(total => log(total))
//       .catch(err => log(err));
//   })
// );

document.getElementById('myButton').onclick = operations;
