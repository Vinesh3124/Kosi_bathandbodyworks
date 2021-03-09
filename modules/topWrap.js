// Important---------> topWrap mdoule will not show elements in file if you do not spacify  <div id="top-wrap"></div> tag in html file

//Create wrap module
let wrap = document.createElement('div');
wrap.setAttribute('class','wrap')

//Creat Burger button and search btn
let burger = document.createElement('div');
burger.setAttribute('class','burger');
for(let i=1;i<=3;i++){
    let line = document.createElement('div')
    line.setAttribute('class','line' + i)
    burger.appendChild(line)
}

//Create Logo
let logo = document.createElement('div');
logo.setAttribute('class','logo')
let img = document.createElement('img');
img.setAttribute('src','https://www.bathandbodyworks.com/on/demandware.static/Sites-BathAndBodyWorks-Site/-/default/dw255cc1f3/images/svg-icons/Logos-main.svg');
logo.appendChild(img);

//Create Search bar and right end icons
let search_bar = document.createElement('div');
search_bar.setAttribute('class','search-bar');


//Append all elemnts to wrap to export
wrap.appendChild(burger)
wrap.appendChild(logo)
wrap.appendChild(search_bar)

export {wrap}