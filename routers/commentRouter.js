const express = require("express");
const Comment = require("../schemas/comment");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware")

router.post("/comment", authMiddleware, async (req, res, next) => {
  try {
    const { postId } = req.body;
    const { user } = res.locals;
    const { desc } = req.body;
    //const { date } = (new Date().format("yyyy-MM-dd a/p hh:mm:ss"))

    const author = user["nickname"];
    const recentComment = await Comment.find().sort("-commentId").limit(1);

    let commentId = 1;
    if (recentComment.length != 0) {
      commentId = recentComment[0]["commentId"] + 1;
    }

    await Comment.create({ commentId, postId, desc, author });
    res.send({ result: "success" });

  } catch (err) {
    next(err);
  }
});

router.get("/comment/:postId", async(req, res) => {
    const {postId} = req.params
    const comment = await Comment.find({postId}).sort("-commentId")

    res.json({comment: comment})
})


router.delete("/comment", authMiddleware, async(req, res)=>{
    const {user} = res.locals
    const { commentId } = req.body
    const tokenNickname = user["nickname"]

    const p = await Comment.findOne({commentId})
    const dbNickname = p["author"]

    console.log(tokenNickname, dbNickname)

    if(tokenNickname === dbNickname) {
        await Comment.deleteOne({commentId})
        res.send({result: "success"})
    }
    else{
        res.send({result: "권한 없습니다(서버쪽임)"})
    }
})

router.patch("/comment", authMiddleware, async(req, res) => {
    const { user } = res.locals
    const { commentId, desc } = req.body

    console.log(commentId, desc)

    const tokenNickname = user["nickname"]

    const p = await Comment.findOne({commentId})
    const dbNickname = p["author"]

    if(tokenNickname === dbNickname) {
        await Comment.updateOne({ commentId }, {$set : { desc }})
        res.send({result: "success"})
    } else{
        res.send({result: "권한이 없습니다(서버 쪽)"})
    }
})



module.exports = router;