const mongoose = require('mongoose')

const { Schema } = mongoose

//제목, 작성자명, 작성 비밀번호, 작성 시간, 작성내용
const listSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    pwd: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },

    submitDate: {
        type: Number,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Lists', listSchema)
