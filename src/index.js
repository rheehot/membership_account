import { signIn } from './signIn/signIn.js';
import { agree } from './signIn/agree.js';
import { main } from './main/main.js';
import { logIn } from './logIn/logIn.js';
import * as validate from './utils/validate.js';
import { tag } from './utils/tag.js';


//TODO:
//1.메인페이지 띄우기
//2.메인페이지의 로그인, 회원가입 버튼 누르면 innerHTML로 갈아끼우기
//3.회원가입 이후 메인페이지로 이동시 로그인 회원가입 버튼 지우기 

//TODO: 화면갈아끼울때 이벤트도 제거해주자
const signInPage = {
    init(){
        document.querySelector('body').innerHTML = signIn;
        validate.showMsg.init('id', 'input', validate.validID );
        validate.showMsg.init('pw', 'input', validate.validPW );
        validate.showMsg.init('pw-reconfirm', 'input', validate.reconfirmPW );
        validate.showMsg.init('birth', 'input', validate.validBirth);
        validate.showMsg.init('birth', 'select', validate.validBirth);
        validate.showMsg.init('email', 'input', validate.validEmail);
        validate.showMsg.init('number', 'input', validate.validNumber);
        tag.init('.input-favorite');
        this.popUpAgree();
    },
    //TODO: agree핍업관련 유틸로 옮기기
    popUpAgree(){
        const target = document.querySelector('.agreecheck');
        target.addEventListener('click',(e)=>{
            document.querySelector('body').insertAdjacentHTML('afterbegin',agree);
            this.activeBtn();
            this.closeAgree();
        })
    },
    closeAgree(){
        const target = document.querySelector('.agreebox .close-btn');
        target.addEventListener('click',(e)=>{
            //TODO: element remove하고 싶다.
            // const agreeBox = document.querySelector('.wrap-agree');
            // agreeBox.style.display="none";
        })
    },
    activeBtn(){
        const target = document.querySelector('.agreebox .content');
        target.addEventListener('scroll', (e)=>{
            if(e.target.scrollTop===280){
                document.querySelector('.agreebox .agree-btn').classList.add("active");
            }
        })

    }
}
signInPage.init();