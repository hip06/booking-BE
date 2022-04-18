import express from 'express'

let configViewEngine = (app) => {
    //setup nơi lấy file tĩnh
    app.use(express.static('./src/public'))
    //set view engine
    app.set('view engine', 'ejs')
    //đọc ejs ở đâu?
    app.set('views', './src/views')
}

module.exports = configViewEngine
