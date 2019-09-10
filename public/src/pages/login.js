import routesPage from '../utils/routesPage.js';
import { postData } from '../utils/dataExchange.js';

const logIn = {
  /**
   * Creates a login view
   *
   * @param {} No param
   * @return {string} The login view.
   */
  async render() {
    const view = /* html */ `
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <div class="wrap-login">
        <div class="loginbox">
            <form action="" id="logIn-form">
                <div class="id form-group">
                    <input type="text" placeholder='아이디' class="input-id form-control">
                </div>
                <div class="pw form-group">
                    <input type="password" placeholder='비밀번호' class="input-pw form-control">
                </div>
                <div class="error"></div>
                <button type="button" class="btn btn-success login-btn">로그인</button>
            </form>
        </div>
        </div>      
        `;
    return view;
  },

  /**
   * Routes based on session, Attatchs click event to login button
   *
   * @param {object} user response from session check api.
   * @return No return
   */
  async afterRender(user) {
    if (user !== undefined) {
      await routesPage('/');
    }
    const target = document.querySelector('.login-btn');
    target.addEventListener('click', this.loginHandler);
  },

  /**
   * fetches login api, prints error or routes page
   *
   * @param {} No param.
   * @return No return
   */
  async loginHandler() {
    const id = document.querySelector('.input-id').value;
    const pw = document.querySelector('.input-pw').value;
    const msg = document.querySelector('.error');

    await postData('/api/users/login', { id, pw }).then(async (response) => {
      if (response.status === 204) {
        msg.innerHTML = '일치하는 아이디 패스워드가 없습니다.';
      } else {
        await routesPage('/');
      }
    });
  },
};

export default logIn;
