import { JOIN } from '../components/join.js';

const join = {
    init(validator){
        const target = document.querySelector('.join');
        target.addEventListener('click',()=>{
            validator.emptyCheckInit();
            const checkMsg = validator.errorMsg;
            const MSG = [];
            for( let el in checkMsg){
                if(checkMsg[el]=== 'empty') MSG.push(`${el} 값을 입력해주세요`)
                else if(checkMsg[el]!==null) MSG.push(`${el}: ${checkMsg[el]}`);
            }   
            (MSG.length > 0) ? this.popUpJoin(MSG): this.submit();
        })
    },
    popUpJoin(msg){
        document.querySelector('body').insertAdjacentHTML('afterbegin',JOIN);
        document.querySelector('.content-join').innerHTML = this.msgReducer(msg);
        this.closeJoin();
    },
    msgReducer(msg){
        return msg.reduce((acc,cur)=>{
            return `${acc}<br>${cur}`;
        });
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
    async submit(){
        await document.getElementById('signIn-form').submit();
    }
}
export { join };