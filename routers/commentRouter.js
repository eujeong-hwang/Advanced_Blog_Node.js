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

router.get("/comment/:ID", async(req, res) => {
    
})










module.exports = router;