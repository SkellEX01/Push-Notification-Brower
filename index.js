require('dotenv').config({ path: '.env' });
const express = require('express')
const webPush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

const PORT = process.env.PORT || 5000
const publicVapidKey = process.env.PUBLIC_VAPID_KEY
const privateVapidKey = process.env.PRIVATE_VAPID_KEY

webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey)

app.post('/subscribe', (req, res) => {
    const subscription = req.body
    const payload = JSON.stringify({ title: 'Administrator' });
    webPush.sendNotification(subscription, payload)
    res.status(201).json({ body: 'Sent!' })
})

app.listen(PORT, () => console.log(`Server running in port ${PORT}`))
