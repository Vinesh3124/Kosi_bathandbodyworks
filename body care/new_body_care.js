// =========================================nav js==========================================================

let drop_1 = document.getElementById('nav-dropdown0');
let drop_2 = document.getElementById('nav-dropdown1');
let drop_3 = document.getElementById('nav-dropdown2');
let drop_4 = document.getElementById('nav-dropdown3');
let category = document.getElementsByClassName('category');
let sub_cat_drop = document.getElementsByClassName('nav-sub-dropdown');
let sub_cat_sub_el = document.getElementsByClassName('sub-category');


var dropdowns = document.getElementsByClassName('drop')
drop_1.addEventListener('mouseover',function(){
    dropdowns[0].classList.toggle("open-dropdown")
})

drop_1.addEventListener('mouseout',function(){
    dropdowns[0].classList.toggle("open-dropdown")
})

drop_2.addEventListener('mouseover',function(){
    dropdowns[1].classList.toggle("open-dropdown")
})

drop_2.addEventListener('mouseout',function(){
    dropdowns[1].classList.toggle("open-dropdown")
})

drop_3.addEventListener('mouseover',function(){
    dropdowns[2].classList.toggle("open-dropdown")
})

drop_3.addEventListener('mouseout',function(){
    dropdowns[2].classList.toggle("open-dropdown")
})

drop_4.addEventListener('mouseover',function(){
    dropdowns[3].classList.toggle("open-dropdown")
})

drop_4.addEventListener('mouseout',function(){
    dropdowns[3].classList.toggle("open-dropdown")
})

for(var i=0;i<sub_cat_drop.length;i++){
    sub_cat_drop[i].addEventListener('mouseover',(event)=>{
    //    console.log(sub_cat_sub_el[3])
       event.target.childNodes[1].classList.toggle("open-sub-category")
            var a = event.target.parentNode.classList;
  
    })
    sub_cat_drop[i].addEventListener('mouseleave',(event)=>{
        //    console.log(sub_cat_sub_el[3])
            event.target.childNodes[1].classList.toggle("open-sub-category")

    })
}

//===============================================Mobile Nav slide
let burger = document.getElementsByClassName('burger');
let navbar = document.getElementsByClassName('nav-links');
let close = document.getElementById('close-btn')
let nav = document.querySelector('nav');

burger[0].addEventListener('click',()=>{
      navbar[0].classList.toggle('open-nav');
      document.body.style.background = 'rgba(0,0,0,0.4)';
      nav.classList.toggle('pos');
      nav.style.overflowY = 'scroll';
})

close.addEventListener('click',()=>{
    navbar[0].classList.toggle('open-nav')
    nav.classList.toggle('pos');
    document.body.style.background = 'none';
    //   nav.style.overflowY = 'scroll';
})


// window.onclick = (event) =>{
//     if (event.target != nav){
//         if(navbar[0].classList.contains('open-nav')){
//             navbar[0].classList.toggle('open-nav')
//             console.log(event.target)
//         }
       
//     }
// }



//Footer
// let help_btn = document.getElementsByClassName('help-btn');
// let cols = document.getElementsByClassName('col')

// help_btn[0].addEventListener('click',()=>{
//     for(var i=1;i<=4;i++){
//         cols[i].classList.toggle("open-end-nav")
//     }
    
// })
// sub_cat_drop[2].addEventListener('mouseover',()=>{
//     //    console.log(sub_cat_sub_el[3])
//        event.target.childNodes[1].classList.toggle("open-sub-category")
//        condole.log(event.target.childNodes[3].innerHTML)
//     })

// sub_cat_drop[2].addEventListener('mouseleave',()=>{
//     //    console.log(sub_cat_sub_el[3])
//         event.target.childNodes[1].classList.toggle("open-sub-category")
//         console.log(event.target.childNodes[3].innerHTML)
// })



// ===================================my pages js==================================================
// 1. Declare this globally at the top of your file
let newBodyProducts = []; 
let arr = JSON.parse(localStorage.getItem("cart")) || [];

// 2. Fetch the data once on load
window.addEventListener("load", () => {
    fetch("/Database/database.json")
        .then(res => res.json())
        .then(data => {
            newBodyProducts = data.new_body;
            // logic to display your products goes here...
        });
});

// 3. Optimized Add function
function add(event) {
    // Extract the numerical ID from the button ID (e.g., "btn1" -> 1)
    let btnid = event.target.id; 
    let numericId = parseInt(btnid.replace("btn", ""));

    // Find the product in our local array
    const product = newBodyProducts.find(item => item.id === numericId);

    if (product) {
        let temp = {
            id: product.id,
            name: product.name,
            img: product.img,
            price: product.Price,
            desc: product.Short_Description,
            count: product.count || 1,
            total: product.Price
        };

        // Add to array and update LocalStorage
        arr.push(temp);
        localStorage.setItem("cart", JSON.stringify(arr));

        // Display Success Modal
        showCartModal();
    }
}

function showCartModal() {
    let modal1 = document.getElementById("myModal1");
    let span1 = document.getElementsByClassName("close1")[0];
    
    modal1.style.display = "block";
    
    document.getElementById("cartAddModal").innerHTML = `
        <div class="cartAdd">
            <h3>Item Added to Cart</h3>
            <div class="imageBox">
                <img src="https://media.tenor.com/images/b95474b4e57295c82fb7ffc3b882e683/tenor.gif" class="img" alt="Success">
            </div>
        </div>
    `;

    span1.onclick = () => modal1.style.display = "none";
    window.onclick = (e) => { if (e.target == modal1) modal1.style.display = "none"; };
}

var expanded = false;

function showCheckboxes1() {
  let checkboxes = document.getElementById("ptcheckboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    checkboxes.style.position="absolute"
    checkboxes.style.backgroundColor="white"
    checkboxes.style.borderBottom = "2px solid black"
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}
function showCheckboxes2() {
    let checkboxes = document.getElementById("fncheckboxes");
    if (!expanded) {
      checkboxes.style.display = "block";
      checkboxes.style.position="absolute"
    checkboxes.style.backgroundColor="white"
    checkboxes.style.borderBottom = "2px solid black"

      expanded = true;
    } else {
      checkboxes.style.display = "none";
      expanded = false;
    }
  }function showCheckboxes3() {
    var checkboxes = document.getElementById("fccheckboxes");
    if (!expanded) {
      checkboxes.style.display = "block";
      checkboxes.style.backgroundColor="white"
      checkboxes.style.borderBottom = "2px solid black"
      checkboxes.style.position="absolute"
      expanded = true;
    } else {
      checkboxes.style.display = "none";
      expanded = false;
    }
  }



  // =============================================footer js=======================================
      
let help_btn = document.getElementsByClassName('help-btn');
let cols = document.getElementsByClassName('col')

help_btn[0].addEventListener('click',()=>{
    for(let i=1;i<=4;i++){
        cols[i].classList.toggle("open-end-nav")
    }
    
})