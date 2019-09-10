import triggerEvent from '../utils/eventTrigger.js';

const Header = {
  render: async () => {
    const view = /* html */ `
             <div class="header">
                <h1 class="logo">TODO</h1>
                <div class="info"></div>
            </div>
        `;
    return view;
  },
  afterRender: async () => {
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
      window.history.pushState(null, null, '/');
      triggerEvent(window, 'routing');
    });
  },
};

export default Header;
