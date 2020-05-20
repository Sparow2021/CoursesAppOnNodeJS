const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const homeRoutes = require('./routes/home');
const cardRoutes = require('./routes/card')
const mongoose = require('mongoose')


const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main', // основной layoyt hbs через который идёт вход
    extname:'hbs'  // расширение чтобы потом не указывать в res.render
})
app.engine('hbs', hbs.engine) // регистрируем в экспрессе что есть такой движок
app.set('view engine', 'hbs') // подключаем этот движок
app.set('views', 'views') // папка для хранения шаблонов ЯВНО указываем

app.use(express.static(path.join(__dirname,'public'))) // для линков в хеде корневой каталог
app.use(express.urlencoded({extended:true})) // должно быть перед роутами инача не будет работать ЧИТКА параметров запроса
app.use('/add',addRoutes);
app.use('/courses',coursesRoutes);
app.use('/',homeRoutes); // эта штука вначале (перед роутом) называется префикс
app.use('/card', cardRoutes);




async function start(){
    try{
        const password = "9w4M6zFDIjAp1e5e" //жулик не воруй (пожалуйста лень выносить в config)
        const url = "mongodb+srv://Vladinger:9w4M6zFDIjAp1e5e@cluster0-z1ehl.mongodb.net/test?retryWrites=true&w=majority"
        // await mongoose.connect(url, 
        //     {
        //         useNewUrlParser: true,
        //         useUnifiedTopology: true
        //     })
        const PORT = process.env.PORT || 3000; // гибкость порта, потом разберём
        app.listen(PORT, ()=>{
        console.log('Server is running...')
    })
    } catch (e) {
        console.log(e)
    }  
}

start()




