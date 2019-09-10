import triggerEvent from './eventTrigger.js';

const routesPage = async (url) => {
  await window.history.pushState(null, null, url);
  await triggerEvent(window, 'routing');
};

export default routesPage;
