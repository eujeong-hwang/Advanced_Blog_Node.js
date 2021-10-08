const { idCheck, pwLengthCheck, pw_idCheck, pwCheck} = require('./userTest.js')

test('닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 이루어져 있어야 합니다.', () => {
    expect(idCheck('AaBb12')).toEqual(true)
    expect(idCheck('eujeong0626')).toEqual(true)
    expect(idCheck('Ab**')).toEqual(false)
    expect(idCheck('11')).toEqual(false)
    expect(idCheck('황유정')).toEqual(false)
})

test('비밀번호는 최소 4자 이상이어야 합니다.', () => {
    expect(pwLengthCheck('hello1234')).toEqual(true)
    expect(pwLengthCheck('aa')).toEqual(false)
})

test('닉네임과 같은 값이 포함된 경우 회원가입에 실패합니다', () => {
    expect(pw_idCheck ('eujeong0626', 'hello1234')).toEqual(true)
    expect(pw_idCheck ('aaab', 'aaab')).toEqual(false)
})


test('비밀번호 확인은 비밀번호와 정확하게 일치해야 합니다.', () => {
    expect(pwCheck('aaab01', 'aaab01')).toEqual(true)
    expect(pwCheck('aaaa', 'aabb')).toEqual(false)
})
  