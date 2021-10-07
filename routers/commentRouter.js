const express = require('express')
const Comment = require('../schemas/comment')
const router = express.Router()

const authMiddleware = require('../middlewares/auth-middleware')

router.post('/comment', authMiddleware, async (req, res, next) => {
    try {
        const { postId } = req.body
        const { user } = res.locals
        const { desc } = req.body

        const author = user['nickname']
        // ?
        const recentComment = await Comment.find().sort('-commentId').limit(1)

        let commentId = 1
        if (recentComment.length != 0) {
            commentId = recentComment[0]['commentId'] + 1
        }

        await Comment.create({ commentId, postId, desc, author })
        res.send({ result: 'success' })
    } catch (err) {
        next(err)
    }
})

router.get('/comment/:postId', async (req, res) => {
    const { postId } = req.params
    // comment를 내림차순으로 sort한다.
    const comment = await Comment.find({ postId }).sort('-commentId')

    res.json({ comment: comment })
})

router.delete('/comment', authMiddleware, async (req, res) => {
    const { user } = res.locals
    const { commentId } = req.body
    const tokenNickname = user['nickname']

    const p = await Comment.findOne({ commentId })
    const dbNickname = p['author']

    if (tokenNickname === dbNickname) {
        await Comment.deleteOne({ commentId })
        res.send({ result: 'success' })
    } else {
        res.send({ result: '권한 없습니다.' })
    }
})

router.patch('/comment', authMiddleware, async (req, res) => {
    const { user } = res.locals
    const { commentId, desc } = req.body
    // user db에서 현재 로그인된 사람의 nickname을 가져온다
    const tokenNickname = user['nickname']

    const p = await Comment.findOne({ commentId })
    // comment를 쓴 author를 가져온다
    const dbNickname = p['author']

    // user db에 저장된 nickname과 comment를 쓴 author가 동일하면
    if (tokenNickname === dbNickname) {
        //코멘트의 새로운 내용(desc)를 업데이트 한다
        await Comment.updateOne({ commentId }, { $set: { desc } })
        res.send({ result: 'success' })
    } else {
        res.send({ result: '권한이 없습니다.' })
    }
})

module.exports = router
