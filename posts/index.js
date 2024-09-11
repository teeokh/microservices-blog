const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto') // Allows us to generate random ID for posts
const cors = require('cors')

const app = express()
app.use(bodyParser.json()) // Ensures the JSON data we get from user request is parsed properly into JS
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body // The body of the request will have a title key - we're getting the value 

    posts[id] = { // Add the ID and title of the post to the posts object, using the ID as the key
        id, title
    }

    res.status(201).send(posts[id])
})

app.listen(4000, () => {
    console.log('Listening on 4000')
})