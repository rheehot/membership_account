import Join from '../components/join.js';

const join = {
  init(validator) {
    const target = document.querySelector('.join');
    target.addEventListener('click', () => {
      //   validator.emptyCheckInit();
      //   const checkMsg = validator.data;
      //   const MSG = [];
      //   for (const el in checkMsg) {
      //     if (checkMsg[el] === 'empty') MSG.push(`${el} 값을 입력해주세요`);
      //     else if (checkMsg[el] !== null) MSG.push(`${el}: ${checkMsg[el]}`);
      //   }
      //   MSG.length > 0 ? this.popUpJoin(MSG) : this.postForm();
      this.postForm();
    });
  },
  popUpJoin(msg) {
    document.querySelector('body').insertAdjacentHTML('afterbegin', Join);
    document.querySelector('.content-join').innerHTML = this.msgReducer(msg);
    this.closeJoin();
  },
  msgReducer(msg) {
    return msg.reduce((acc, cur) => `${acc}<br>${cur}`);
  },
  removeJoin() {
    const agreeBox = document.querySelector('.wrap-modal');
    agreeBox.parentElement.removeChild(agreeBox);
  },
  closeJoin() {
    const target = document.querySelector('.join-btn');
    target.addEventListener('click', () => {
      this.removeJoin();
    });
  },
  async postForm() {
    const data = {};
    const formData = new FormData(document.getElementById('signIn-form'));
    const birth = new Date(
      formData.get('year'),
      formData.get('month'),
      formData.get('date'),
    );
    formData.append('birth', birth);
    // TODO: validator에서 넘어온 값으로 쓰면 더 좋을듯
    const favorite = [];
    const tags = document.querySelectorAll('.tag span');
    tags.forEach((tag) => {
      favorite.push(tag.innerText);
    });
    formData.append('favorite', favorite);
    formData.forEach((value, key) => {
      data[key] = value;
    });

    await postData('/api/users/signin', data)
      .then((response) => console.log(JSON.stringify(response)))
      .catch((error) => console.error(error));

    window.location.href = '#/';
  },
};

const postData = async (url = '', data = {}) => {
  const options = {
    method: 'POST',
    cache: 'no-cache',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options).then((res) => res.json());
  return response;
};

export default join;
