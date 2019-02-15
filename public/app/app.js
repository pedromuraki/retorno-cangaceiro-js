import { log, timeoutPromise, retry } from './utils/promise-helpers.js';
import { notasService as service } from './nota/service.js';
import { pipe, partialize, takeUntil, debounceTime } from './utils/operators.js';
import EventEmitter from './utils/event-emitter.js';
import './alert-handler.js';
import './console-handler.js';

const action = () => {
  retry(3, 3000, () => timeoutPromise(service.sumItems('2143'), 200))
    .then(total => EventEmitter.emit('sumItems', total))
    .catch(err => log(err));
};

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
)(action);

document.getElementById('myButton').onclick = operations;
