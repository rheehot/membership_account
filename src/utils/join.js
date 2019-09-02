import { JOIN } from '../signIn/join.js';

const join = {
    init(validator){
        this.checkValid();

    },
    checkValid(){
        // if(){
        //     this.popUpJoin();
        // }
        // else { this.submit(); }
    },
    popUpJoin(){
        const target = document.querySelector('.join');
        target.addEventListener('click',()=>{
            document.querySelector('body').insertAdjacentHTML('afterbegin',JOIN);
            document.querySelector('.content-join').innerHTML = 
            this.closeJoin();
        })
    },
    removeJoin(){
        const agreeBox = document.querySelector('.wrap-modal');
        agreeBox.parentElement.removeChild(agreeBox);
    },
    closeJoin(){
        const target = document.querySelector('.join-btn');
        target.addEventListener('click',()=>{
            this.removeJoin();
        })
    },
    submit(){

    }
}
export { join };