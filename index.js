const express = require('express')
const app = express()

const port = process.env.port || 3000;

const jwt = require('jsonwebtoken')
const authMiddleware = require('./middlewares/auth-middleware')

// dotenv 모듈 (local port number, secret-key, local host, server host, host user& password)
const dotenv = require("dotenv")
dotenv.config()

// express.json()은 post 메서드의 body 정보를 쉽게 가공해주는
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//schemas 파일들과 연결하기
const connect = require('./schemas')
connect()

//api 설정
const listRouters = require('./routers/listRouter')
app.use('/api', [listRouters])

const userRouters = require('./routers/userRouter')
app.use('/api', [userRouters])

const commentRouters = require('./routers/commentRouter')
app.use('/api', [commentRouters])

//ejs 템플릿 엔진을 위한 것
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => { res.render('list')})
app.get('/detail', (req, res) => { res.render('detail')})
app.get('/write', (req, res) => { res.render('write')})
app.get('/edit', (req, res) => { res.render('edit')})
app.get('/signIn', (req, res) => { res.render('signIn')})
app.get('/signUp', (req, res) => { res.render('signUp')})
app.get('/comment', (req, res) => { res.render('comment')})


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})