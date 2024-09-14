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

    comments.push({ id: commentId, content, status: 'pending' }) // Push a comment object into the comments array

    commentsByPostID[req.params.id] = comments // Create new value for that post ID in the commentsByPostID object

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })

    res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
    console.log('Received event: ', req.body.type)

    const { type, data } = req.body

    if (type === 'CommentModerated') {
        const { id, postId, content, status } = data
        const comments = commentsByPostID[postId]

        const comment = comments.find(comment => {
            return comment.id === id // We try to find the comment in our local storage equal to the one we received in req body data
        })

        comment.status = status // Update our locally stored comment's status

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                content,
                status,
            }
        })
    }

    res.send({})
})

app.listen(4001, () => {
    console.log('Listening on 4001')
})