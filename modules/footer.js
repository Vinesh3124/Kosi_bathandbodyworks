// Important---------> Footer mdoule will not show elements in file if you do not spacify  <footer></footer> tag in html file

    let footer_el = document.createElement('ul');
    for(let i =0 ; i<7;i++){
        let li = document.createElement('li');
        li.innerHTML = 'footer-links';
        footer_el.appendChild(li);
    }

    export {footer_el};

