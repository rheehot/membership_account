const assert = require('assert');

describe('Array', () => {
  // Test 상황에 대해 묘사한다.
  describe('#indexOf()', () => {
    // 실제 테스트 하는 함수를 콜백으로 작성한다.
    it('equal success', () => {
      assert.equal(-1, [1, 2, 3].indexOf(4)); // 두 입력값이 같은지 체크
    });

    it('equal fail', () => {
      assert.equal(1, [1, 2, 3].indexOf(4)); // 두 입력값이 같은지 체크
    });
  });
});
