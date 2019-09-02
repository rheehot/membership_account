import { agree } from '../signIn/agree.js';

const agreement = {
    init(){
      this.popUpAgree();
    },
    popUpAgree(){
        const target = document.querySelector('.agreecheck');
        target.addEventListener('click',()=>{
            document.querySelector('body').insertAdjacentHTML('afterbegin',agree);
            this.activeBtn();
            this.closeAgree();
        })
    },
    removeAgree(){
        const agreeBox = document.querySelector('.wrap-agree');
        agreeBox.parentElement.removeChild(agreeBox);
    },
    closeAgree(){
        const target = document.querySelector('.agreebox .close-btn');
        target.addEventListener('click',()=>{
            this.removeAgree();
        })
    },
    activeBtn(){
        const target = document.querySelector('.agreebox .content');
        target.addEventListener('scroll', (e)=>{
            if(e.target.scrollTop===600){
                document.querySelector('.agreebox .agree-btn').classList.add("active");
                this.checkAgree();
            }
        })
    },
    checkAgree(){
        const target = document.querySelector('.agree-btn.active');
        target.addEventListener('click',()=>{
           const checkbox=document.querySelector('.input-agree');
           checkbox.checked = true;
           this.removeAgree();
        })
    }
}
export { agreement };