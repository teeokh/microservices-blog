const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body // Each of our events has a type and data attribute - and is contained in the req body

    if (type === 'PostCreated') {
        const { id, title } = data

        posts[id] = { id, title, comments: [] } // We've extrapolated all this. We set comments to [] 
    }

    if (type === 'CommentCreated') {
        const { id, content, postId } = data

        const post = posts[postId] // Select relevant post using postId

        if (post) {
            post.comments.push({ id, content }) // Add comment's ID and content to the post's comments array
        }

    }
    res.send({})

})

app.listen(4002, () => {
    console.log('Listening on 4002')
})