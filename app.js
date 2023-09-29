const express = require('express')
const app = express()
const restaurants = require('./public/restaurant.json').results

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use((req, res, next) => {
  res.locals.keyword = ''
  next()
})

app.get('/', (req, res) => {
  return res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  return res.render('layouts/main', { restaurants, body: 'index', title: '我的餐廳總覽' })
})

app.get('/restaurants/search', (req, res) => {
  let { keyword } = req.query
  res.locals.keyword = keyword = keyword.trim().toLowerCase()
  if (!keyword) return res.redirect('/restaurants')
  const foundRestaurants = restaurants.filter(restaurant =>
    Object.values(restaurant).some(value => String(value).toLowerCase().includes(keyword)))
  return res.render('layouts/main', { restaurants: foundRestaurants, body: 'index', title: '符合條件的餐廳' })
})

app.get('/restaurants/:id', (req, res) => {
  const { id } = req.params
  const restaurant = restaurants.find(r => r.id === Number(id))
  return res.render('layouts/main', { restaurant, body: 'show', title: restaurant.name })
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})