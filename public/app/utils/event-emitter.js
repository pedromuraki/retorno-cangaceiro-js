const events = new Map();

const EventEmitter = {
  on(event, listener) {
    if (!events.has(event)) events.set(event, []);

    events.get(event).push(listener);
  },

  emit(event, payload) {
    const listeners = events.get(event);

    if (listeners) listeners.forEach(listener => listener(payload));
  },
};

export default EventEmitter;
