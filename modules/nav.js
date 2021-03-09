// Important---------> Nav mdoule will not show elements in file if you do not spacify <nav></nav> tag in html file

//Create module to export
let navbar = document.createElement('div');

//Create Nav links
    let ul = document.createElement('ul');
    let links = ['BODY CARE','HAND SOAP & SANITIZERS','HOME FRAGRANCE','GIFTS','SHOP BY FRAGRANCE','GET INSPIRED','TOP OFFERS']
    ul.setAttribute('class','nav-links')
    for(let i =0 ; i<7;i++){
        let li = document.createElement('li');
        li.innerHTML = links[i];

        //set id to make dropdown
        if(i<4){
            li.setAttribute('id','nav-dropdown' + i)
        }

        ul.appendChild(li);
    }

//Append All elements in module
    navbar.appendChild(ul);
  
    export {navbar};
