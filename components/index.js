//메인페이지 띄우기
// 메인페이지의 로그인, 회원가입 버튼 누르면 innerHTML로 갈아끼우기
import { signIn } from './signIn/signIn.js';
import { main } from './main/main.js';
import { logIn } from './logIn/logIn.js';
import * as validate from './utils/validate.js';

document.querySelector('body').innerHTML = signIn;

validate.showMsg.registerEvent('id', 'input', validate.ID );
validate.showMsg.registerEvent('pw', 'input', validate.PW );
validate.showMsg.registerEvent('pw-reconfirm', 'input', validate.reconfirmPW );
validate.showMsg.registerEvent('birth', 'input', validate.Birth);
validate.showMsg.registerEvent('birth', 'select', validate.Birth);
validate.showMsg.registerEvent('email', 'input', validate.Email);
validate.showMsg.registerEvent('number', 'input', validate.Number);

