const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/events', async (req, res) => { // This is where we recieve an event from the event bus
    const { type, data } = req.body // Post request informtion is always sent in the request body

    if (type === 'CommentCreated') {
        const status = data.content.includes('shit') ? 'rejected' : 'approved' // If content includes shit, we set to rejected

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                content: data.content,
                postId: data.postId,
                status: status
            }
        })
    }

    res.send({})
})

app.listen(4003, () => {
    console.log('Listening on 4003')
})