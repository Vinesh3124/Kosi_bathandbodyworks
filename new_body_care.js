let help_btn = document.getElementsByClassName('help-btn');
let cols = document.getElementsByClassName('col')
​
help_btn[0].addEventListener('click',()=>{
    for(var i=1;i<=4;i++){
        cols[i].classList.toggle("open-end-nav")
    }
    
})