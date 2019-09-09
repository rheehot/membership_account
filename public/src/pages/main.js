import { deleteData } from '../utils/dataExchange.js';
import triggerEvent from '../utils/eventTrigger.js';

const main = {
  /**
   * Creates a main view.
   *
   * @param {user} response from session check api.
   * @return {string} The main view.
   */
  render: async (user) => {
    const userId = user !== undefined ? user.id : 'There';

    const view = /* html */ `
            <div class="wrap-main">
                <h1>Hello ${userId}!</h1>
                <div class="btnBox login">
                    <div class="btn signin-btn">회원가입</div>
                    <div class="btn login-btn">로그인</div>
                </div>
                <div class="btnBox logout">
                    <div class="btn logout-btn">로그아웃</div>
                </div>
            </div>
        `;

    return view;
  },
  /**
   * Styles DOM based on session, Attatchs click event to logout button.
   *
   * @param {object} user response from session check api.
   * @return No return
   */
  afterRender: async (user) => {
    const loginBox = document.querySelector('.btnBox.login');
    const logoutBox = document.querySelector('.btnBox.logout');
    const logoutBtn = document.querySelector('.logout-btn');
    const signinBtn = document.querySelector('.signin-btn');
    const loginBtn = document.querySelector('.login-btn');

    if (user !== undefined) {
      loginBox.style.display = 'none';
      logoutBox.style.display = 'flex';
    } else {
      loginBox.style.display = 'flex';
      logoutBox.style.display = 'none';
    }

    logoutBtn.addEventListener('click', () => {
      deleteData('api/users/logout').then(() => {
        window.history.pushState(null, null, '/');
        triggerEvent(window, 'routing');
      });
    });
    signinBtn.addEventListener('click', () => {
      window.history.pushState(null, null, '/signin');
      triggerEvent(window, 'routing');
    });
    loginBtn.addEventListener('click', () => {
      window.history.pushState(null, null, '/login');
      triggerEvent(window, 'routing');
    });
  },
};

export default main;
