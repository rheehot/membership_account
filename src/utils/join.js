import Join from '../components/join.js';
import users from '../assets/userData.js';
 
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
            (MSG.length > 0) ? this.popUpJoin(MSG): this.postForm();
        })
    },
    popUpJoin(msg){
        document.querySelector('body').insertAdjacentHTML('afterbegin',Join);
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
    async postForm(){
        //TODO: 전체 데이터 비동기 포스트
        const id= document.querySelector('.input-id').value;
        const pw= document.querySelector('.input-pw').value;
        postData({id:id, pw:pw});
        window.location.href = `#/home/${id}`;
    }
}

const postData = async (user) => {
    const options = {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
        users.push(user);
        console.log(users);
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

export { join };