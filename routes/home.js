const {Router} = require('express');
const router = Router();


router.get('/', (req,res)=>{
    res.render('index', {
        title:'Главная страница',
        isHome: true
    })// рендерит движок!!! не путать с линками в head входной лэйаут main.hbs
} )



module.exports = router;