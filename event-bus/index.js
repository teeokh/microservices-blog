const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/events', (req, res) => { // Server listens for post reques to /events
    const event = req.body // Our event will be whatever we receive in the request body

    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4001/events', event)
    axios.post('http://localhost:4002/events', event)
    axios.post('http://localhost:4003/events', event)

    // We send this event to every service

    res.send({ status: 'OK' })
})

app.listen(4005, () => {
    console.log('Listening on 4005')
})