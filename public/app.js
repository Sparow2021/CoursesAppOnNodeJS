const toCurrency = price =>{
    return  Intl.NumberFormat('ru-Ru', {
        currency: 'usd',
        style: 'currency'
    }).format(price)
}


document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent)
})


const $card = document.querySelector('#card') //проверяем есть ли данный элемент на странице
if($card){
    $card.addEventListener('click', event=>{
        if (event.target.classList.contains('js-remove')){
            const id = event.target.dataset.id
            
            fetch('card/remove/' +id, { 
                method: 'delete' 
            }).then(res=> res.json()) // фетч вернул промис мы его распарсили
               .then(card=>{ // получили card объект
                   if(card.courses.length){
                        const html = card.courses.map(c=>{
                            return `
                            <tr>
                            <td>${c.title}</td>
                            <td>${c.count}</td>
                            <td>
                            <button class ="btn btm-small js-remove" data-id=${c.id}>Удалить</button>
                            </td>
                            </tr>
                            `
                        }).join('')
                        $card.querySelector('tbody').innerHTML = html
                        $card.querySelector('.price').textContent = toCurrency(card.price) 
                   }else{
                       $card.innerHTML ='<p>Корзина пуста</p>'
                   }
               })




        }
    })
}

