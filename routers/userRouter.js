const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./schemas/user");
const router = express.Router();



// 회원가입 API - POST
router.post("/users", async (req, res) => {
  const { nickname, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).send({
      errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
    });
    return;
  }

  // email or nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
  const existsUsers = await User.findOne(nickname);
  if (existsUsers) {
    res.status(400).send({
      errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
    });
    return;
  }

  const user = new User({ nickname, password });
  await user.save();

  res.status(201).send({});
});


//로그인 API - POST
router.post("/signIn", async (req, res) => {
    const { nickname, password } = req.body;
  
    const user = await User.findOne({ nickname });
  
    //만약 user가 없거나
    //password가, 찾은 nickname의 password와 일치하지 않는다면
    //에러메세지를 보낸다
    if (!user || password !== user.password) {
      res.status(400).send({
        //일부러 error message를 모호하게 말해준다.
        errorMessage: "닉네임 또는 패스워드를 확인해주세요.",
      });
      return;
    }
  
    const token = jwt.sign({userId: user.userId}, "my-secret-key")
    res.send({token})
  
  //   res.send({
  //     //sign을 만들어야 token을 만들 수 있다!
  //     token: jwt.sign({ nickname: nickname }, "my-secret-key"),
  //   });
  });

module.exports = router;