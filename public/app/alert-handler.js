import EventEmitter from './utils/event-emitter.js';

const alertTotal = (total) => alert(total);

EventEmitter.on('sumItems', alertTotal);
