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
let end_icon = document.createElement('div');
end_icon.setAttribute('class','end_nav_icons')

let search_bar = document.createElement('div');
search_bar.setAttribute('class','search-bar');
let input = document.createElement('input');
input.setAttribute('type','text')
input.setAttribute('placeholder','Search')
let search_btn = document.createElement('button');
let search_btn_icon = document.createElement('img');
search_btn_icon.setAttribute('src','modules/assets/search.png')
search_btn.appendChild(search_btn_icon);
search_bar.appendChild(input);
search_bar.appendChild(search_btn);
let myAccount = document.createElement('img');
myAccount.setAttribute('src','modules/assets/UI-MyAccount.svg')
myAccount.setAttribute('id','myAccount')
let addBag = document.createElement('img');
addBag.setAttribute('src','modules/assets/UI-AddToBag.svg')

end_icon.appendChild(search_bar);
end_icon.appendChild(myAccount);
end_icon.appendChild(addBag);

//Append all elemnts to wrap to export
wrap.appendChild(burger)
wrap.appendChild(logo)
wrap.appendChild(end_icon)

export {wrap}