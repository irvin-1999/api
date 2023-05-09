const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {

    const query = req.body.cityName
    const apiKey = '1669d9d29189b4f96a963b840da91bb1'
    const unit = 'metric'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + unit + '&zip=za'
    https.get(url, (response) => {
        console.log(response.statusCode)

        response.on('data', (data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'

            res.write('<p> The weather is currently: ' + description + '</p>')
            res.write('<h1>The temperature in ' + query + ' is: ' + temp + ' degrees celcius</h1>')
            res.write('<img src=' + imageUrl + '')
        })
    })
})



app.listen(3000, () => {
    console.log('Server is running on Port 3000.')
})