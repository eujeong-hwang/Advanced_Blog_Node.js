function idCheck(id_give) {
    const reg_name = /^[A-Za-z0-9+]*$/
    if (reg_name.test(id_give) && id_give.length >= 3) {
        return true
    }
    return false
}

function pwLengthCheck(pw_give) {
    if (pw_give.length >= 4) {
        return true
    }
    return false
}

function pw_idCheck(id_give, pw_give) {
    if (!id_give.includes(pw_give)) {
        return true
    }
    return false
}

function pwCheck(pw_give, pw2_give) {
    if (pw_give === pw2_give) {
        return true
    }
    return false
}

module.exports = { idCheck, pwCheck, pwLengthCheck, pw_idCheck }
