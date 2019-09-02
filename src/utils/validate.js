import { triggerEvent } from './eventTrigger.js';

const validator = {
    //{status:true,msg:--}
    errorMsg:{},
    init(tag){
        this.attatchEvent(validID);
        this.attatchEvent(validPW);
        this.attatchEvent(reconfirmPW );     
        this.attatchEvent(validBirth);
        this.attatchEvent(validEmail);
        this.attatchEvent(validNumber);
        this.attatchEvent(validFavorite, 'keyup', tag);
    },
    attatchEvent(validObj, event, tag ){
        validObj.dom.forEach( classname => {
            const target = document.querySelector(`.${classname}`);
            this.registerEvent(target, validObj, event, tag);
        });
    },
    registerEvent(target, validObj, event='change', tag ){
        target.addEventListener(event, (e) => {
            const arg = tag !== undefined ? tag.tagList.length : target.value;
            const valid = validObj.validate(arg);
            this.errorMsg[validObj.name] = valid.status !== 'good' ? valid.msg : null;
            // this.errorMsg[validObj.name] = valid;
            showMsg(validObj, valid);
        })
    },
    //TODO: 중복코드 줄이기
    emptyCheck(validObj, option){
        validObj.dom.forEach( classname => {
            const target = document.querySelector(`.${classname}`);
            //약관
            if(validObj.type === 'checkbox' && !target.checked){
                this.errorMsg[validObj.name] = option || 'empty';
            }else if(validObj.type === 'checkbox' && target.checked){
                this.errorMsg[validObj.name] = null;
            }
            // //이름
            else if(validObj.name === '이름' && target.value === ""){
                this.errorMsg[validObj.name] = option || 'empty';
            }else if(validObj.name === '이름' && target.value !== ""){
                this.errorMsg[validObj.name] = null;
            }
            // //성별
            else if(validObj.name === '성별' && target.value === ""){
                this.errorMsg[validObj.name] = option || 'empty';
            }else if(validObj.name === '성별' && target.value !== ""){
                this.errorMsg[validObj.name] = null;
            }
            //관심사
            else if(validObj.name === '관심사' && !validObj.status ){
                this.errorMsg[validObj.name] = option || 'empty';
            }else if(validObj.name === '관심사' && validObj.status){
                this.errorMsg[validObj.name] = this.errorMsg[validObj.name];
            }
            //그외
            else if(target.value === ""){
                this.errorMsg[validObj.name] = option || 'empty';
            }else{
                this.errorMsg[validObj.name] = this.errorMsg[validObj.name];
            }
        });
    },
    emptyCheckInit(){
        this.emptyCheck(validID);
        this.emptyCheck(validPW);
        this.emptyCheck(validName);
        this.emptyCheck(validBirth);
        this.emptyCheck(validGender, '성별을 선택해 주세요');
        this.emptyCheck(validEmail);
        this.emptyCheck(validNumber);
        this.emptyCheck(validFavorite, '3개 이상의 관심사를 입력해주세요'); 
        this.emptyCheck(validAgreement, '약관에 동의해주세요');
    }
}

const showMsg = (validObj, valid) => {
    const msgField = document.querySelector(`.${validObj.field} .error`);
    msgField.innerHTML = valid.msg;
    msgField.style.color = valid.status !== 'good' ? '#f00': '#37b24d'; 
}

const validID = {
    dom: ['input-id'],
    type:'input',
    field: 'id',
    name: '아이디',
    regExpId: /^[0-9a-z_-]{5,20}$/,
    msg:{
        taken: {status:'taken', msg:'이미 사용중인 아이디입니다.'},
        wrong: {status:'wrong', msg:'5-20자의 영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.'},
        good:  {status:'good', msg:'사용가능한 아이디입니다.'}
    },
    validate(id){
        if(!this.regExpId.test(id)) return this.msg.wrong;
        else if(this.checkDuplication(id)) return this.msg.taken;
        else return this.msg.good;
    },
    checkDuplication(id){
        const data = ['boostcamp','boost'];
        return data.includes(id);
    }
}

//TODO: if else 안쓸수 있을 것 같은데 어렵다. 고민하자.
const validPW = {
    dom: ['input-pw'],
    type:'input',
    field: 'pw',
    name: '비밀번호',
    regExpPw:{
        capitalErr:/(?=.*[A-Z])/,
        numberErr: /(?=.*[0-9])/,
        spcErr:/(?=.*?[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"])/,
        completeErr:/^[A-Za-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,16}$/,
    },
    msg:{
        lengthErr: {status:'lengthErr', msg:'8자 이상 16자 이하로 입력해주세요.'},
        capitalErr: {status:'capitalErr', msg:'영문 대문자를 최소 1자 이상 포함해주세요.'},
        numberErr: {status:'numberErr', msg:'숫자를 최소 1자 이상 포함해주세요.'},
        spcErr: {status:'spcErr', msg:'특수문자를 최소 1자 이상 포함해주세요.'},
        completeErr: {status:'completeErr', msg:'8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.'},
        good: {status:'good', msg:'안전한 비밀번호입니다.'},
    },
    validate(pw){
        triggerEvent(document.querySelector('.input-pw-reconfirm'),'change');
        if(pw.length < 8 || pw.length > 16) return this.msg.lengthErr;
        else if(!this.regExpPw.capitalErr.test(pw)) return this.msg.capitalErr;
        else if(!this.regExpPw.numberErr.test(pw)) return this.msg.numberErr;
        else if(!this.regExpPw.spcErr.test(pw)) return this.msg.spcErr;
        else if(!this.regExpPw.completeErr.test(pw)) return this.msg.completeErr;
        else return this.msg.good;
    },
}

const reconfirmPW = {
    dom: ['input-pw-reconfirm'],
    type:'input',
    field: 'pw-reconfirm',
    name: '비밀번호 재확인',    
    msg:{
        wrong:{status:'wrong', msg:'비밀번호가 일치하지 않습니다.'},
        good: {status:'good', msg:'비밀번호가 일치합니다.'}
    },
    validate(confirmpw, pw = document.querySelector('.input-pw')){
        return pw.value === confirmpw? this.msg.good : this.msg.wrong;
    }
}

const validBirth = {
    dom: ['input-year','input-month','input-date'],
    type:'input',
    field: 'birth',
    name: '생년월일',    
    regExpYear: /^[0-9]{4}$/,
    regExpDate: /^[0-9]{1,2}$/,
    msg: { 
        yearErr: { status:'yearErr', msg:'태어난 년도 4자리를 정확하게 입력하세요.' },
        ageErr: { status:'ageErr', msg:'만 14세 이상만 가입 가능합니다.' },
        monthErr: { status:'monthErr', msg:'태어난 월을 다시 확인해주세요.' },
        dateErr: { status:'dateErr', msg:'태어난 날짜를 다시 확인해주세요.' },
        good: {status:'good', msg:''}
    },
    validate(){
        const year = document.querySelector(`.${this.dom[0]}`).value;
        const month = document.querySelector(`.${this.dom[1]}`).value;
        const date = document.querySelector(`.${this.dom[2]}`).value;

        const lastdate = this.getDateRange(year,month);
        const minYear = new Date().getFullYear()-99;
        const maxYear = new Date().getFullYear()-15;

        if(!this.regExpYear.test(year)) return this.msg.yearErr;
        else if(+year < minYear || +year > maxYear ) return this.msg.ageErr;
        else if(month === '') return this.msg.monthErr;
        else if( !this.regExpDate.test(date) || +date < 1 || +date > lastdate ) return this.msg.dateErr;
        else return this.msg.good;
    },
    getDateRange(year, month){
        return new Date(year,month,0).getDate();
    }
}

const validEmail = {
    dom: ['input-email'],
    type:'input',
    field: 'email',
    name: '이메일',
    regExpEmail:/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    msg:{
        wrong: { status:'wrong', msg:'이메일 주소를 다시 확인해주세요.' },
        good: {status:'good', msg:''}
    },
    validate(email){
        if(!this.regExpEmail.test(email)) return this.msg.wrong;
        else return this.msg.good;
    }
}

const validNumber = {
    dom: ['input-number'],
    type:'input',
    field: 'number',
    name: '핸드폰번호',    
    regExpNumber: /^(010)\d{3,4}\d{4}$/,
    msg:{
        wrong: { status:'wrong', msg:'형식에 맞지 않는 번호입니다.' },
        good: {status:'good', msg:''}
    },
    validate(number){
        if(!this.regExpNumber.test(number)) return this.msg.wrong;
        else return this.msg.good;
    }
}

const validFavorite = {
    dom: ['input-favorite'],
    type:'input',
    field: 'favorite',
    name: '관심사',    
    status :  false,
    msg:{
        wrong: { status:'wrong', msg:'3개 이상의 관심사를 입력하세요.' },
        good: {status:'good', msg:''}
    },
    validate(length){
        if(length < 3){
            this.status = false;
            return this.msg.wrong; 
        }
        else {
            this.status = true;
            return this.msg.good;
        }
    }
}

const validName = {
    dom: ['input-name'],
    type:'input',
    field: 'name',
    name: '이름',    
}

const validGender = {
    dom: ['input-gender'],
    type:'input',
    field: 'gender',
    name: '성별',    
}

const validAgreement = {
    dom: ['input-agree'],
    type:'checkbox',
    field: 'agreement',
    name: '약관',    
}

export { validator, showMsg, validFavorite };