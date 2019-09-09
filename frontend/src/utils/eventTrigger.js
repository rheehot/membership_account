const triggerEvent = (el, type) => {
  if ('createEvent' in document) {
    const e = document.createEvent('HTMLEvents');
    e.initEvent(type, false, true);
    el.dispatchEvent(e);
  } else {
    const e = document.createEventObject();
    e.eventType = type;
    el.fireEvent(`on ${e.eventType}`, e);
  }
};

export default triggerEvent;
