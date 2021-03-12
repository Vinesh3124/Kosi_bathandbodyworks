
    
let help_btn = document.getElementsByClassName('help-btn');
let cols = document.getElementsByClassName('col')

help_btn[0].addEventListener('click',()=>{
    for(let i=1;i<=4;i++){
        cols[i].classList.toggle("open-end-nav")
    }
    
})
var cart_data = [];
async function add(){
    var btnid = event.target.id
    let fet = fetch(" http://localhost:3000/new_body")
    let data = await fet
    let arr = await data.json();
    for(let i = 0 ;i<16;i++){
        if(`btn${arr[i].id}` == btnid){
            cart_data.push(arr[i])
        }
    }
    let json = JSON.stringify(cart_data)
    localStorage.setItem("cart",json)
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


  function quicklook(){
    let div = document.createElement("div")
    
        // <i class="fa fa-eye" style="font-size:36px"></i>
  }