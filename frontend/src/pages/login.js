import getData from '../utils/loigin.js';
const logIn = {
  render: async () => {
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
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>        
        `;
    return view;
  },
  after_render: async () => {
    const target = document.querySelector('.login-btn');
    target.addEventListener('click', async () => {
      const id = document.querySelector('.input-id').value;
      const pw = document.querySelector('.input-pw').value;
      const msg = document.querySelector('.error');
      const response = await getData({ id, pw });

      if (response) {
        window.location.href = '#/';
      } else {
        msg.innerHTML = '일치하는 아이디 패스워드가 없습니다.';
      }
    });
  },
};
export default logIn;
