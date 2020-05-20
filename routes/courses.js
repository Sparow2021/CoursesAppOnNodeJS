const {Router} = require('express');
const Course = require('../models/course')
const router = Router();

router.get('/',async (req,res)=>{

    const courses = await Course.getAll();


    res.render('courses',{
        title:'Курсы',
        isCourses: true,
        courses // взяли объект и передали в страницу через hbs
    })
})


router.post('/edit',async (req,res)=>{

    await Course.update(req.body)
    res.redirect('/courses')

})


router.get('/:id/edit', async(req,res)=>{ // id hbs сам воспринимает как движок
    const course = await Course.getById(req.params.id);
   
    res.render('course-edit',{
        title:`Редактировать курс ${course.title}`,
        course
    })
})

router.get('/:id',async (req,res)=>{

    const course = await Course.getById(req.params.id);

    res.render('course',{
        layout: 'empty',
        title:`Курс ${course.title}`,
        course
    })
})

module.exports = router;