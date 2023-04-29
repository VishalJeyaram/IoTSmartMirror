const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
const cors = require('cors')
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "dc4e82fc9fb246baa4518ad6fb7c8200",
        clientSecret: "4c364740f74d40ed9f9819e73f7305d5",
        refreshToken
    })

    spotifyApi.refreshAccessToken().then((data) => {
        console.log(data.body)
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn
        })
    })
        .catch(() => {
            res.sendStatus(400)
        })
})


app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'dc4e82fc9fb246baa4518ad6fb7c8200',
        clientSecret: '4c364740f74d40ed9f9819e73f7305d5'
    })

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            })
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
})

app.listen(3001)