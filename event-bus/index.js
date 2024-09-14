const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

const events = []

app.post('/events', async (req, res) => { // Server listens for post reques to /events
    const event = req.body // Our event will be whatever we receive in the request body

    events.push(event)

    const services = [
        'http://localhost:4000/events',
        'http://localhost:4001/events',
        'http://localhost:4002/events',
        'http://localhost:4003/events'
    ]

    for (let service of services) {
        try {
            await axios.post(service, event)
        } catch (error) {
            console.error(`Error forwarding event to ${service}:`, error.message)
        }
    }

    res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(4005, () => {
    console.log('Listening on 4005')
}) 