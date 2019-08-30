const validateID = {
    regExpId: /^[0-9a-z_-]{5,20}$/,
    msg:{
        taken:'이미 사용중인 아이디입니다.',
        wrong:'5-20자의 영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.',
        good: '사용가능한 아이디입니다.'
    },
    validate(id){
        if(!this.regExpId.test(id)){ return this.msg.wrong; }
        else if(this.checkDuplication(id)){ return this.msg.taken; }
        else return this.msg.good;
    },

    checkDuplication(id){
        const data = ['boostcamp','boost'];
        return data.includes(id);
    }
}

console.log(validateID.validate('node'))


const validateBirth = {
    regExpYear: /^[0-9]{4}$/,
    msg: { 
        yearErr: { status:'yearErr', msg:'태어난 년도 4자리를 정확하게 입력하세요.' },
        ageErr: { status:'ageErr', msg:'만 14세 이상만 가입 가능합니다.' },
        dateErr: { status:'dateErr', msg:'태어난 날짜를 다시 확인해주세요.' },
        good: {status:'good', msg:''}
    },
    validate(year, month, date){
        const minYear = new Date().getFullYear()-99;
        const maxYear = new Date().getFullYear()-15;
        if(!this.regExpYear.test(year)) return this.msg.yearErr;
        else if(+year < minYear || +year > maxYear ) return this.msg.ageErr;
    },
    getDateRange(year, month){
        // const year = document.querySelector('.input-year').value;
        // const month = document.querySelector('.input-month').value;
        const lastday = new Date(year,month+1,0).getDate();
        console.log(lastday);

    }

}

console.log(validateBirth.validate('2,,1'));
console.log(validateBirth.getDateRange('1999','3'))