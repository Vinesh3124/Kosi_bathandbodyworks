let count = 0
window.addEventListener("load", getLsData)

function getLsData(){
    let html = ""
    let data = localStorage.getItem("cart")
    // console.log(data)
    if(data == null || data == "[]"){
        html+= `
        <div class="emptyCart">
            <h3>Your Shopping Bag is Empty</h3>
            <div class="emptyLS"></div>
            <button id="cartToHomepage" onclick="redirectToHome()">CONTINUE SHOPPING</button>
        </div>
        `
        document.getElementById("displayCartDetails").innerHTML = html
        document.getElementById("displayCartTopData").innerHTML = ""
        document.getElementById("displayCartTotal").innerHTML = ""
    }
    else{
        displayCartFun(data)
    }
}

function redirectToHome(){
    window.location.href = "/index.html"
}

function displayCartFun(data){
    data = JSON.parse(data)
    let topHtml = ""
    let midHtml = ""
    let btmHtml = ""
    topHtml+= `
    <div id="cartProductDetails">
        <div class="cartProductDetails_check">
            <div><p id="cartProductDetails_check_para">ITEMS IN SHOPPING BAG</p></div>
            <button id="checkOutBtn" onclick="paymentModal()">CHECKOUT</button>
        </div>
        <div id="cartProductDetails_check_items"></div>
    </div>
    <div id="cartProductDetails_check_dash"></div>
    `
    document.getElementById("displayCartTopData").innerHTML = topHtml

    midHtml+= `
    <table id="displayCartDetails">
    <tr>
        <th>ITEM</th>
        <th>PRICE</th>
        <th>QTY</th>
        <th>TOTAL PRICE</th>
    </tr>
    `
    let totalPrice = 0
    let amount = 0
    for(let i in data){
        let name = data[i].name
        let id = data[i].id
        let price = data[i].price
        let img = data[i].img
        let desc = data[i].desc
        let Pcount = data[i].count

        if(Pcount < 1){
            removeItemLs(id)
        }

        let newPrice = Number(price)
        totalPrice = Number((newPrice*Pcount)).toFixed(2)
        console.log(typeof(totalPrice)) 
        amount+= Number(totalPrice)
        midHtml+=`
        <tr>
        <td>
            <div class="tableCartItem">
                <div class="tableCartItem_Img">
                    <img src="${img}" class="img" alt="">
                </div>
                <div class="tableCartItem_Info">
                    <strong>${name}</strong>
                    <p>${desc}</p>
                </div>
            </div>
        </td>
        <td>
            <div class="tableCartPrice">
                <p>$${price}</p>
            </div>
        </td>
        <td>
            <div class="displayModalCont_info_btn">
                <div class="displayModalCont_info_btn_count">
                    <button id="minusBtn" onclick="removeItemCart(${id})">-</button>
                    <p id="numValue">${Pcount}</p>
                    <button id="plusBtn" onclick="addItemCart(${id})">+</button>
                </div>
            </div>
        </td>
        <td>
            <div class="finalPrice">
                <p>$${totalPrice}</p>
                <button id="removeLs" onclick="removeItemLs(${id})">X</button>
            </div>
        </td>
        </tr>
    </table>
        `
    }
    document.getElementById("displayCartDetails").innerHTML = midHtml
    // let fprice = totalPrice
    let tax = 10/100
    let taxAmount = totalPrice * tax
    let finaltax = taxAmount.toFixed(2)
    let total = Number(amount)+Number(finaltax)+5.99
    console.log(typeof(finaltax))
    // console.log(total)
    btmHtml=`
    <button id="updateBag" onclick="refreshCart()">UPDATE BAG</button>
    <div id="cartFinalPrice">
        <div id="cartFinalPrice_Promo">
            <div id="cartFinalPrice_Promo_Box">
                <strong>PROMOTION CODE</strong>
                <p>Only one code can be applied per order.</p>
                <div id="cartFinalPrice_Promo_Box_input">
                    <input type="text" id="promoInput">
                    <button id="promoBtn">APPLY</button>
                </div>
            </div>
        </div>
       
        <div id="cartFinalPrice_PriceDetails">
            <div class="price_cart">
                <div>MERCHANDISE SUBTOTAL</div>
                <div>$${amount}</div>
            </div>
            <div class="price_cart1">
                <div>ESTIMATED SHIPPING & HANDLING - Standard</div>
                <div>$5.99</div>
            </div>
            <div class="price_cart2">
                <div>SALES TAX</div>
                <div>$${finaltax}</div>
            </div>
            <div class="price_cart3">
                <div>Tax is estimated and will be calculated when your order is processed.</div>
            </div>
            <div class="cart_Dash"></div>
            <div class="price_cart4">
                <div>ORDER TOTAL (USD)</div>
                <div>$${total.toFixed(2)}</div>
            </div>
            <button id="checkOutBtn1" onclick="paymentModal()">CHECKOUT</button>
            <div class="price_cart6">
                <div>International Shoppers</div>
            </div>
            <div class="price_cart3">
                <div>All prices are displayed and processed in US dollars (USD).</div>
            </div>
        </div>
    </div>
    `
    document.getElementById("displayCartTotal").innerHTML = btmHtml
}

function removeItemLs(val){
    let id = val
    let ios = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    let index;
    for (let i = 0; i < ios.length; i++) {
        if (ios[i].id === id) {
          index=i;
          break;
        }
    }
    if(index === undefined) return 
    ios.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(ios));
    getLsData()
}

function refreshCart(){
    getLsData()
}

function paymentModal(){
    let html = ""
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];
    
    html+= `
        <div class="cartPayment">
            <div class="cartPayment_Loading">
                <img src="https://media2.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif" class="img" alt="">
            </div>
            <div class="cartPayment_text">
                <strong>Processing your order, Please wait!!!</strong>
            </div>
        </div>
    `

    document.getElementById("displayPaymentModal").innerHTML = html

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }

    setTimeout(function(){
        let pHtml = ""
        pHtml+= `
        <div class="cartPayment">
            <div class="cartPayment_Loading">
                <img src="https://media.tenor.com/images/cbae2dfd31aa5ec2fcb7f46b65e1550f/tenor.gif" class="img" alt="">
            </div>
            <div class="cartPayment_text">
                <strong>Payment Sucessfull, Thank you for shopping</strong>
            </div>
        </div>
        `
        document.getElementById("displayPaymentModal").innerHTML = pHtml
        localStorage.clear()
        getLsData()
    }, 3000)
}

async function removeItemCart(val){
    let data = localStorage.getItem("cart")
    data = JSON.parse(data)
    for(i in data){    
        if(data[i].id === val){
            data[i].count-= 1
            break;
        }
    }
    localStorage.setItem("cart", JSON.stringify(data))
    getLsData()
}

function addItemCart(val){
    let data = localStorage.getItem("cart")
    data = JSON.parse(data)
    for(i in data){
        if(data[i].id === val){
            data[i].count+= 1
            break;
        }
    }
    localStorage.setItem("cart", JSON.stringify(data))
    getLsData()
}