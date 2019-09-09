import { validator } from '../utils/validate.js';
import controlTag from '../utils/controlTag.js';
import controlAgreement from '../utils/controlAgree.js';
import controlReset from '../utils/resetForm.js';
import controlJoin from '../utils/controlJoin.js';

const signIn = {
  /**
   * Creates a signin view.
   *
   * @param No param
   * @return {string} The signin view.
   */
  render: async () => {
    const view = /* html */ `
        <div class="wrap-signIn">
        <h1>회원가입</h1>
        <form action="" id="signIn-form">
            <fieldset>
                <div class="id">
                    <h5>아이디</h5>
                    <div class="inputBox">
                        <input name="id" ype="text" class="input-id">
                    </div>
                    <div class="error"></div>
                </div>
                <div class="pw">
                    <h5>비밀번호</h5>
                    <div class="inputBox">
                        <input name="pw" type="password" class="input-pw">
                    </div>
                    <div class="error"></div>
                </div>
                <div class="pw-reconfirm">
                    <h5>비밀번호 재확인</h5>
                    <div class="inputBox">
                        <input type="password" class="input-pw-reconfirm">
                    </div>
                    <div class="error"></div>
                </div>
                <div class="name">
                    <h5>이름</h5>
                    <div class="inputBox">
                        <input name="name" type="text" class="input-name">
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div class="birth">
                    <h5>생년월일</h5>
                    <div class="birthform">
                        <div class="birthYear">
                            <div class="inputBox">
                                <input name="year" type="text" class="input-year" placeholder="년(4자)">
                            </div>
                        </div>
                        <div class="birthMonth">
                            <div class="inputBox">
                                <select name="month"class="input-month">
                                    <option value="" disabled selected hidden>월</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </div>
                        </div>
                        <div class="birthDate">
                            <div class="inputBox">
                                <input name="date" type="text" class="input-date" placeholder="일">
                            </div>
                        </div> 
                    </div>
                    <div class="error"></div>
                </div>
                <div class="gender">
                    <h5>성별</h5>
                    <div class="inputBox">
                        <select name="gender" class="input-gender">
                            <option value="" disabled selected hidden>성별</option>
                            <option value="여자">여자</option>
                            <option value="남자">남자</option>
                        </select>
                    </div>
                </div>
                <div class= "email">
                    <h5>이메일</h5>
                    <div class="inputBox">
                        <input name="email" type="text" class="input-email">
                    </div>
                    <div class="error"></div>
                </div>
                <div class= "number">
                    <h5>휴대전화</h5>
                    <div class="inputBox">
                        <input name="number" type="text" class="input-number" placeholder="-없이 입력해주세요 예)0101231234">
                    </div>  
                    <div class="error"></div>
                </div>
                <div class= "favorite">
                    <h5>관심사</h5>
                    <div class="inputBox">
                        <input name="favorite" type="text" class="input-favorite">
                    </div>
                    <div class="error"></div>
                </div>
            </fieldset>
            <div class="agreement">
                <div class="agreecheck">
                    <div>약관에 동의합니다.</div>
                    <input type="checkbox" disabled name="agree" class="input-agree">
                </div>
            </div>
            <div class="submit-btn">
                <button type= "button" class="reset">초기화</button>
                <button type= "button" class="join">가입하기</button>
            </div>
        </form>
    </div>
        `;
    return view;
  },
  /**
   * controls Tag, Agreement, Reset, Join components. inits Validation
   *
   * @param No param
   * @return No return
   */
  afterRender: async () => {
    controlTag.init();
    controlAgreement.init();
    controlReset.init();
    controlJoin.init(validator);
    validator.init(controlTag);
  },
};
export default signIn;
