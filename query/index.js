const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const posts = {}

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data

        posts[id] = { id, title, comments: [] } // We've extrapolated all this. We set comments to [] 
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data

        const post = posts[postId] // Select relevant post using postId

        if (post) {
            post.comments.push({ id, content, status }) // Add comment's ID and content to the post's comments array
        }

    }

    if (type === 'CommentUpdated') { // Updates locally stored comment with data from the event (which was in req body)
        const { id, content, postId, status } = data

        const post = posts[postId]

        const comment = post.comments.find(comment => {
            return comment.id === id
        })

        comment.status = status
        comment.content = content

    }
}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body // Each of our events has a type and data attribute - and is contained in the req body

    handleEvent(type, data)

    res.send({})
})

app.listen(4002, async () => {
    console.log('Listening on 4002')

    const res = await axios.get('http://event-bus-srv:4005/events') // Whenever we use axios, the data we get back is on res.data

    for (let event of res.data) {
        console.log('Processing event: ', event.type)

        handleEvent(event.type, event.data)
    }
})