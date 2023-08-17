const express = require('express')
const app = express()
const restaurants = require('./public/restaurant.json').results

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants })
})

app.get('/restaurants/:id', (req, res) => {
  const {id} = req.params
  const restaurant = restaurants.find(r => r.id.toString() === id)
  console.log(restaurant)
  res.render('show', { restaurant })
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})