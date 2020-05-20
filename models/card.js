const path = require('path');
const fs = require('fs');


class Card {

    static async add(course){
        const card = await Card.fetch()

        const idx = card.courses.findIndex(c=> c.id === course.id) //индекс
        const candidate = card.courses[idx] // курс 
        if(candidate){
            // курс уже есть
            candidate.count++
            card.courses[idx]= candidate;
        }else{
            //нужно добавить
            course.count = 1 // добавляем объекту курса поле count
            card.courses.push(course)
        }

        card.price += +course.price

        return new Promise((resolve,reject)=>{
            fs.writeFile( 
                path.join(__dirname,'../','data','card.json'),
                JSON.stringify(card),
                (err)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve()
                    }
                }
                )
        })

    }


    static async remove(id){
        const card = await Card.fetch() //получаем всё содержимое корзины

        const idx = card.courses.findIndex(c=>c.id ===id)
        const course = card.courses[idx]

        if (course.count === 1){
            //удалить
            card.courses = card.courses.filter(c=>c.id !== id)
        }else{
            // изменить количество
            card.courses[idx].count--
        }

        card.price -= course.price

        return new Promise((resolve,reject)=>{
            fs.writeFile( 
                path.join(__dirname,'../','data','card.json'),
                JSON.stringify(card),
                (err)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(card)
                    }
                }
                )
        })
    }


    static async fetch(){
        return new Promise((resolve, reject)=>{
            fs.readFile(
                path.join(__dirname,'../','data','card.json'),
                'utf-8',
                (err, content)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }
}

module.exports =  Card;