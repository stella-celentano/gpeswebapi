const express = require("express")
const app = express()

const AnalyticsRoutes = require('./routes/analytics.private')


app.use('/analytics', AnalyticsRoutes)

module.exports = app