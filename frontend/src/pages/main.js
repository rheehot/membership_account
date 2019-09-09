const logout = async (url = '') => {
  const options = {
    method: 'DELETE',
    cache: 'no-cache',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  await fetch(url, options).then(() => {
    window.location.reload();
  });
};

const main = {
  render: async (user) => {
    let userId;
    if (user !== undefined) {
      userId = user.id;
    } else {
      userId = 'There';
    }

    const view = /* html */ `
            <div class="wrap-main">
                <h1>Hello ${userId}!</h1>
                <div class="btnBox login">
                    <a href="#/signin" class="btn signin-btn">회원가입</a>
                    <a href="#/login" class="btn login-btn">로그인</a>
                </div>
                <div class="btnBox logout">
                    <div class="btn logout-btn">로그아웃</div>
                </div>
            </div>
        `;

    return view;
  },
  after_render: async (user) => {
    if (user !== undefined) {
      document.querySelector('.btnBox.login').style.display = 'none';
      document.querySelector('.btnBox.logout').style.display = 'flex';
    } else {
      document.querySelector('.btnBox.login').style.display = 'flex';
      document.querySelector('.btnBox.logout').style.display = 'none';
    }

    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', () => {
      logout('api/users/logout');
    });
  },
};

export default main;
