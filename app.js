const express = require('express')
const app = express()
const restaurants = require('./public/restaurant.json').results

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  res.render('./layouts/main', { data: { restaurants, body: 'index', title: '我的餐廳總覽' } })
})

app.get('/restaurants/:id', (req, res) => {
  const { id } = req.params
  const restaurant = restaurants.find(r => r.id.toString() === id)
  res.render('./layouts/main', { data: { restaurant, body: 'show', title: restaurant.name } })
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})