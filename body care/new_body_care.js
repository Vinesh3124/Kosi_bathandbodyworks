
    
let help_btn = document.getElementsByClassName('help-btn');
let cols = document.getElementsByClassName('col')

help_btn[0].addEventListener('click',()=>{
    for(let i=1;i<=4;i++){
        cols[i].classList.toggle("open-end-nav")
    }
    
})
let arr = []
function add(event){

    let btnid = event.target.id
    fetch(`http://localhost:3000/new_body`).then(response => response.json()).then(data => alldata(data)).catch(error => console.log(error))
  function alldata(data){
    for(let i = 0 ;i<16;i++){
      if(`btn${data[i].id}` == btnid){
          var id = data[i].id
      }
    }

    fetch(`http://localhost:3000/new_body?id=${id}`).then(response => response.json()).then(data => getProductDetailsCart(data)).catch(error => console.log(error))
    
    function getProductDetailsCart(data){
        let html = ""
        let id = data[0].id
        let name = data[0].name
        let img = data[0].img
        let price = data[0].Price
        let shr_Desc = data[0].Short_Description
        let count = data[0].count
        let total = data[0].totalP
        console.log(total)
        let temp = {}
        temp.id = id
        temp.name = name
        temp.img = img
        temp.price = price
        temp.desc = shr_Desc
        temp.count = count
        temp.total = total

        console.log(temp)
        arr = [...arr,temp]
        localStorage.setItem("cart",JSON.stringify(arr))
        let modal1 = document.getElementById("myModal1");
        let span1 = document.getElementsByClassName("close1")[0];
        modal1.style.display = "block";
        span1.onclick = function() {
            modal1.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal1) {
                modal1.style.display = "none";
            }
        }

        html+= `
        <div class="cartAdd">
            <h3>Item Added to Cart</h3>
            <div class="imageBox">
                <img src="https://media.tenor.com/images/b95474b4e57295c82fb7ffc3b882e683/tenor.gif" class="img" alt="">
            </div>
        </div>
        `
        document.getElementById("cartAddModal").innerHTML = html
    }
  }
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