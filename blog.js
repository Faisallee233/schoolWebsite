document.addEventListener('DOMContentLoaded', ()=>{
    let newsParent = document.querySelector('.news');
    let addbtn = document.querySelector('.addbtn');
    let delbtn = document.querySelector('.delbtn');
    let tagblogs = document.querySelector('.tagblogs');
    let text = document.getElementById('text');
    let auther = document.getElementById('auther');
    let date = document.getElementById('date');
    let description = document.getElementById('description');

    
    //add to the blog  box and increament the total count

    addbtn.addEventListener('click',()=>{
    // create a div for the containing data from the inputs

    let boxNews =  document.createElement('div');
    boxNews.style.border = '1px solid black'
    boxNews.style.borderRadius = '12px'
    boxNews.style.background = 'black'
    boxNews.style.color = 'white'

    let h3 = document.createElement('h3');
    h3.textContent = text.value;
    let h4 = document.createElement('h4');
    h4.textContent = auther.value;
    let h5 = document.createElement('h5');
    h5.textContent = date.value;
    let p = document.createElement('p');
    p.textContent = description.value;
     
    boxNews.appendChild(h3);
    boxNews.appendChild(h4);
    boxNews.appendChild(h5);
    boxNews.appendChild(p);

   

    localStorage.setItem('boxNews',boxNews);
    const stored = localStorage.getItem('boxNews');
    if(stored){
      newsParent.appendChild(stored)
    }
    }
)
    //delete to the blog  box and decreament the total count

    
})