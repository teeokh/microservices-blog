const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto') // Allows us to generate random ID for posts
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json()) // Ensures the JSON data we get from user request is parsed properly into JS
app.use(cors())

const posts = {}

// app.get('/posts', (req, res) => {
//     res.send(posts)
// })

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body // The body of the request will have a title key - we're getting the value 

    posts[id] = { // Add the ID and title of the post to the posts object, using the ID as the key
        id, title
    }

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    })

    res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
    console.log('Received event: ', req.body.type) // The event was stored in the body of the original request

    res.send({})
})

app.listen(4000, () => {
    console.log('Listening on 4000')
})