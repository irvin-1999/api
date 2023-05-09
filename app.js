const express = require('express')
const https = require('https')

const app = express()

app.get('/', (req, res) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Pretoria&appid=1669d9d29189b4f96a963b840da91bb1&units=metric&zip=za'
    https.get(url, (response) => {
        console.log(response.statusCode)

        response.on('data', (data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'

            res.write('<p> The weather is currently: ' + description + '</p>')
            res.write('<h1>The temperature in Pta is: ' + temp + ' degrees celcius</h1>')
            res.write('<img src=' + imageUrl + '')
        })
    })
})



app.listen(3000, () => {
    console.log('Server is running on Port 3000.')
})