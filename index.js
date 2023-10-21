const express = require('express')

const axios = require('axios')

const cors = require('cors')

const redis = require('redis');




const app = express()

app.use(express.urlencoded({ extended: true }))


app.use(cors())


const redisClient = redis.createClient();

redisClient.on('connect', function () {
    console.log('Connected!');
});
(async () => {
    await redisClient.connect();
})();

const DEFAULT_EXPIRATION = 3600

app.get('/photos', async (req, res) => {

    const albumId = req.query.albumId

    // console.log('hit /photos')
    const redRes = await redisClient.get('photos')
    if (redRes == null) {

        const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos',
            { params: { albumId } }
        )

        redisClient.setEx("photos", DEFAULT_EXPIRATION, JSON.stringify(data))

        res.json({
            "cached": "false",
            data: data
        })
    } else {
        console.log(redRes)
        res.json({
            "cached": "true",
            data: JSON.parse(redRes)
        })
    }

})

app.get('/photos/:id', async (req, res) => {

    const redRes = await redisClient.get(`photos:${req.params.id}`)


    if (redRes == null) {


        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos/${req.params.id}`
        )

        redisClient.setEx(`photos:${req.params.id}`, DEFAULT_EXPIRATION, JSON.stringify(data))

        res.json({
            "cached": "false",
            data: data
        })

    } else {
        console.log(redRes)
        res.json({
            "cached": "true",
            data: JSON.parse(redRes)
        })
    }




})

app.listen(3000, () => {
    console.log('listening at 3000')
})