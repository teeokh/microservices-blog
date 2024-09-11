const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostID = {}

// app.get('/posts/:id/comments', (req, res) => {
//     res.send(commentsByPostID[req.params.id] || [])
// })

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body

    const comments = commentsByPostID[req.params.id] || [] // This will lookup post ID, and give an array or undefined (checks if post ID is in commentsByPostID object)

    comments.push({ id: commentId, content }) // Push a comment object into the comments array

    commentsByPostID[req.params.id] = comments // Create new value for that post ID in the commentsByPostID object

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    })

    res.status(201).send(comments)
})

app.post('/events', (req, res) => {
    console.log('Received event: ', req.body.type)

    res.send({})
})

app.listen(4001, () => {
    console.log('Listening on 4001')
})