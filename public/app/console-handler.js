import EventEmitter from './utils/event-emitter.js';

const logTotal = (total) => console.log(total);

EventEmitter.on('sumItems', logTotal);
