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
    console.log(req.body, 'req');
    const subscription = req.body
    res.status(201).json({})
    const payload = JSON.stringify({ title: 'Push notifications with Service Workers' })
    webPush.sendNotification(subscription, payload).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`Server running in port ${PORT}`))
