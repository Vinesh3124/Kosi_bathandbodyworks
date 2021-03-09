//import Top wrap elements to use in navigation bar
import {wrap} from './modules/topWrap.js'

//import navigation elements to use in navigation bar
import {navbar} from './modules/nav.js'
//import Footer elements to use in navigation bar
import {footer_el} from './modules/footer.js'

//Use Top wrap elements in navigation bar
var top_wrap = document.getElementById('top-wrap')
top_wrap.appendChild(wrap);

//Use nav elements in navigation bar
var nav = document.querySelector('nav')
nav.appendChild(navbar);

//Use footer elements in navigation bar
var footer = document.querySelector('footer')
// footer.appendChild(footer_el);