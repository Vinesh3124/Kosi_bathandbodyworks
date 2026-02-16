// Declare these at the top so ALL functions can access them
let freshProducts = []; 
let arr = JSON.parse(localStorage.getItem("cart")) || [];

//==============================================Image Change SetInterval===============================================
window.addEventListener("load", setImageTime)

function setImageTime(){
    let playHtml = ""
    playHtml+=`
    <i id="pBtn" class="fas fa-pause-circle"></i>
    `
    document.getElementById("buttonCtrl").innerHTML = playHtml
    Btncount = 0
    let image = document.getElementById("changeImage");
    let currentPos = 0;
    let img = [
        "https://www.bathandbodyworks.com/on/demandware.static/-/Sites-BathAndBodyWorks-Library/default/dw3bdbc9d0/images/Spring2021/diff_room_SP2_0_hm_3.jpg",
        "https://www.bathandbodyworks.com/on/demandware.static/-/Sites-BathAndBodyWorks-Library/default/dwac2f90eb/images/Spring2021/diff_room_SP2_0_hm_4.jpg",
        "https://www.bathandbodyworks.com/on/demandware.static/-/Sites-BathAndBodyWorks-Library/default/dwbe67a6ac/images/Spring2021/diff_room_SP2_0_hm_1.jpg",
        "https://www.bathandbodyworks.com/on/demandware.static/-/Sites-BathAndBodyWorks-Library/default/dw53fc7de3/images/Spring2021/diff_room_SP2_0_hm_2.jpg"
    ]

    function volgendefoto() {
        if (++currentPos >= img.length)
        currentPos = 0;
        image.src = img[currentPos];
    }

    var timeImage = setInterval(volgendefoto, 2000);

    document.getElementById("pBtn").addEventListener("click", stopTimmer)

    var Btncount = 0

    function stopTimmer(){
        let html = ""
        Btncount++
        console.log(Btncount)
        if(Btncount > 1){
            Btncount = 0
        }
        if(Btncount == 0){
            console.log("Play")
            timeImage = setInterval(volgendefoto, 2000)
        }
        if(Btncount == 1){
            console.log("Pause")
            clearInterval(timeImage)
            html+=`
                <i id="pBtn" class="far fa-play-circle" onclick="setImageTime()"></i>
            `
            document.getElementById("buttonCtrl").innerHTML = html
        }
    }
}
//================================================Offer DIV===============================================================
window.addEventListener("load", getOfferData);

function getOfferData() {
    let pageCount = 1;
    const limit = 4;
    let allOffers = []; // Global variable to store all data from JSON

    // 1. Fetch the local JSON file
    fetch("/Database/database.json")
        .then(response => response.json())
        .then(data => {
            allOffers = data.offer; // Store the array of offers
            renderPage(); // Initial render
        })
        .catch(error => console.error("Error loading local JSON:", error));

    // 2. Logic to slice data and display it
    function renderPage() {
        const start = (pageCount - 1) * limit;
        const end = start + limit;
        const paginatedData = allOffers.slice(start, end);

        displayOfferData(paginatedData);
        updateButtons();
    }

    // 3. Update Button visibility based on current page
    function updateButtons() {
        const maxPages = Math.ceil(allOffers.length / limit);
        
        // Handle Left Button
        document.getElementById("leftOfferBtn").style.display = (pageCount > 1) ? "block" : "none";
        
        // Handle Right Button
        document.getElementById("rightOfferBtn").style.display = (pageCount < maxPages) ? "block" : "none";
    }

    // 4. Event Listeners
    document.getElementById("rightOfferBtn").addEventListener("click", function() {
        pageCount++;
        renderPage();
    });

    document.getElementById("leftOfferBtn").addEventListener("click", function() {
        pageCount--;
        renderPage();
    });

    // 5. Build the HTML UI
    function displayOfferData(data) {
        let html = "";
        data.forEach(item => {
            html += `
            <div class="offerCard">
                <div class="offerInfor">
                    <p class="firstPara">${item.name}</p>
                    <p class="secondPara">${item.offerPrice}</p>
                    <p class="thirdPara">${item.Description || ""}</p>
                </div>
                <button class="shopBtn">SHOP</button>
            </div>
            `;
        });
        document.getElementById("displayOfferData").innerHTML = html;
    }
}

//=================================================New Products Display=================================================

window.addEventListener("load", getNewProducts);

function getNewProducts() {
    let pageCount = 1;
    const limit = 3;
    //let freshProducts = []; // To store data from local JSON

    // 1. Fetch from local database.json
    fetch("/Database/database.json")
        .then(response => response.json())
        .then(data => {
            freshProducts = data.Fresh; // Access the "Fresh" array
            renderNewItems(); // Initial display
        })
        .catch(error => console.log("Error loading Fresh products:", error));

    // 2. Pagination & Slicing Logic
    function renderNewItems() {
        const start = (pageCount - 1) * limit;
        const end = start + limit;
        const paginatedItems = freshProducts.slice(start, end);

        displayNewItem(paginatedItems);
        updateNavButtons();
    }

    // 3. Update Nav Button Visibility
    function updateNavButtons() {
        const maxPages = Math.ceil(freshProducts.length / limit);
        
        // pNavBtn1 is "Previous", pNavBtn2 is "Next"
        document.getElementById("pNavBtn1").style.display = (pageCount > 1) ? "block" : "none";
        document.getElementById("pNavBtn2").style.display = (pageCount < maxPages) ? "block" : "none";
    }

    // 4. Event Listeners
    document.getElementById("pNavBtn2").addEventListener("click", function() {
        pageCount++;
        renderNewItems();
    });

    document.getElementById("pNavBtn1").addEventListener("click", function() {
        pageCount--;
        renderNewItems();
    });

    // 5. Display the UI
    function displayNewItem(data) {
        let html = "";
        data.forEach(item => {
            // Note: Use 'item.Price' (Capital P) as per your JSON structure
            html += `
            <div class="displayProduct_Card">
                <div class="card_image" onmouseover="quickViewIn(${item.id})" onmouseout="quickViewOut(${item.id})">
                    <img src="${item.img}" class="img" alt="${item.name}">
                </div>
                <div class="card_info">
                    <p class="card_info_para">${item.name}</p>
                    <p class="card_info_para_desc">${item.Short_Description}</p>
                </div>
                <button onclick="addToCart(${item.id})" class="card_AddCartBtn">ADD TO BAG</button>
                <div class="flat" id="quickViewDiv_${item.id}" onclick="getProductDetails(${item.id})" onmouseover="quickViewIn(${item.id})" onmouseout="quickViewOut(${item.id})">
                    <i class="fas fa-eye">
                        <p>Quicklook</p>
                    </i>
                </div>
            </div>
            `;
        });
        document.getElementById("displayProduct").innerHTML = html;
    }
}

//===============================================Adding Data to LS======================================================
// 1. Initialize cart from LocalStorage so you don't lose items on refresh
// let arr = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(val) {
    // We assume 'freshProducts' is the global array from your getNewProducts() function
    // Find the specific product in our local data
    const product = freshProducts.find(item => item.id === val);

    if (product) {
        // Create the temp object (mapping the JSON fields to your cart fields)
        let temp = {
            id: product.id,
            name: product.name,
            img: product.img,
            price: product.Price,
            desc: product.Short_Description,
            count: product.count || 1,
            total: product.Price // Initial total is just the price
        };

        // Check if item already exists in cart to avoid duplicates (Optional but recommended)
        const isAlreadyInCart = arr.some(item => item.id === product.id);
        
        if (!isAlreadyInCart) {
            arr.push(temp);
            localStorage.setItem("cart", JSON.stringify(arr));
        }

        // Show the Modal
        showCartModal();
    }
}

function showCartModal() {
    let modal1 = document.getElementById("myModal1");
    let span1 = document.getElementsByClassName("close1")[0];
    
    modal1.style.display = "block";
    
    // UI for the Modal
    let html = `
        <div class="cartAdd">
            <h3>Item Added to Cart</h3>
            <div class="imageBox">
                <img src="https://media.tenor.com/images/b95474b4e57295c82fb7ffc3b882e683/tenor.gif" class="img" alt="Success">
            </div>
        </div>
    `;
    document.getElementById("cartAddModal").innerHTML = html;

    // Close logic
    span1.onclick = () => modal1.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal1) modal1.style.display = "none";
    };
}

//===============================================Product view Modal======================================================
function getProductDetails(val) {
    // 1. Show the modal immediately
    const modal = document.getElementById("myModal"); // Ensure this matches your HTML ID
    modal.style.display = "block";

    // 2. Find the product in your local 'freshProducts' array instead of fetching
    // Note: freshProducts must be defined in the global scope
    const product = freshProducts.find(item => item.id === val);

    if (product) {
        displayModalData(product);
    } else {
        console.error("Product not found locally");
    }

    function displayModalData(data) {
        // Since we are passing a single object, we don't need data[0]
        let html = `
        <div class="displayModalCont">
            <div class="displayModalCont_img">
                <img src="${data.img}" class="img" alt="${data.name}">
            </div>
            <div class="displayModalCont_info">
                <div class="displayModalCont_info_name">
                    <strong>${data.name}</strong>
                    <p>${data.Short_Description}</p>
                </div>
                <div class="displayModalCont_info_desc">${data.Description}</div>
                <div class="displayModalCont_info_price">$${data.Price}</div>
                <div class="displayModalCont_info_btn">
                    <div class="displayModalCont_info_btn_count">
                        <button id="modalMinusBtn">-</button>
                        <p id="modalNumValue">1</p>
                        <button id="modalPlusBtn">+</button>
                    </div>
                    <button class="displayModalCont_info_btn_cart" onclick="addToCart(${data.id})">ADD TO BAG</button>
                </div>
            </div>
        </div>
        `;

        document.getElementById("DisplayModalProductData").innerHTML = html;
        
        // 3. Add logic for the + and - buttons inside the modal
        setupModalCounter();
    }
}

function setupModalCounter() {
    const plus = document.getElementById("modalPlusBtn");
    const minus = document.getElementById("modalMinusBtn");
    const value = document.getElementById("modalNumValue");
    let count = 1;

    plus.onclick = () => {
        count++;
        value.innerText = count;
    };

    minus.onclick = () => {
        if (count > 1) {
            count--;
            value.innerText = count;
        }
    };
}

function addToCartH(val){
    console.log("object")
}

var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//------------------------------------------------------------------------------------------------------------

function quickViewIn(val){
    let id = val
    let elem = document.getElementsByClassName("flat")
    for(let i = 0; i < elem.length; i++){
        elem[i].style.display = "block"
        console.log(id)
    }
}

function quickViewOut(val){
    let id = val
    let elem = document.getElementsByClassName("flat")
    for(let i = 0; i < elem.length; i++){
        elem[i].style.display = "none"
        console.log(id)
    }
}

//==========================================Hompage Mid Banner===========================================================
window.addEventListener("load", loadBanner);

function loadBanner() {
    // 1. Fetch from the local database.json file
    fetch("/Database/database.json")
        .then(response => response.json())
        .then(data => {
            // Access the "Banner" array from your JSON
            displayBannerData(data.Banner); 
        })
        .catch(error => console.log("Error loading banners:", error));

    function displayBannerData(data) {
        let html = "";
        
        // Using forEach is cleaner than for...in for arrays
        data.forEach(item => {
            html += `
            <div class="hompageMidPoster_card">
                <div class="hompageMidPoster_card_img">
                    <img src="${item.img}" class="img" alt="Banner Image">
                </div>
                <div class="hompageMidPoster_card_info">
                    <p>${item.Description}</p>
                    <a href="#">${item.link}</a>
                </div>
            </div>
            `;
        });
        
        document.getElementById("hompageMidPoster").innerHTML = html;
    }
}

//=======================================Home Page Category==============================================================
window.addEventListener("load", getCategory);

function getCategory() {
    // 1. Fetch from local JSON
    fetch("/Database/database.json")
        .then(response => response.json())
        .then(data => {
            // Access the "Category" array from your local file
            displayCategory(data.Category);
        })
        .catch(error => console.log("Error loading categories:", error));

    function displayCategory(data) {
        let html = "";
        
        // Loop through the category items
        data.forEach(item => {
            html += `
            <div class="shopByCata_Card">
                <div class="shopByCata_Card_Img">
                    <img src="${item.img}" class="img" alt="${item.name}">
                </div>
                <div class="shopByCata_Card_Cata">
                    <p>${item.name}</p>
                </div>
            </div>
            `;
        });
        
        document.getElementById("shopByCata").innerHTML = html;
    }
}
//================================================BodyWork Images=========================================================
window.addEventListener("load", getBodyWorkData);

function getBodyWorkData() {
    let pageCount = 1;
    const limit = 4;
    let allBodyWorkImages = []; // Array to hold local JSON data

    // 1. Fetch from local database.json
    fetch("/Database/database.json")
        .then(response => response.json())
        .then(data => {
            allBodyWorkImages = data.atBodyWorks;
            renderBodyWorkPage(); // First load
        })
        .catch(error => console.log("Error loading BodyWork data:", error));

    // 2. Pagination Logic (The "Brain")
    function renderBodyWorkPage() {
        const start = (pageCount - 1) * limit;
        const end = start + limit;
        const paginatedData = allBodyWorkImages.slice(start, end);

        displayBodyWorkData(paginatedData);
        updateBodyWorkButtons();
    }

    // 3. Dynamic Button Visibility
    function updateBodyWorkButtons() {
        const maxPages = Math.ceil(allBodyWorkImages.length / limit);
        
        document.getElementById("leftOfferBtn1").style.display = (pageCount > 1) ? "block" : "none";
        document.getElementById("rightOfferBtn1").style.display = (pageCount < maxPages) ? "block" : "none";
    }

    // 4. Clean Event Listeners
    document.getElementById("rightOfferBtn1").addEventListener("click", function() {
        pageCount++;
        renderBodyWorkPage();
    });

    document.getElementById("leftOfferBtn1").addEventListener("click", function() {
        pageCount--;
        renderBodyWorkPage();
    });

    // 5. Build the UI
    function displayBodyWorkData(data) {
        let html = "";
        data.forEach(item => {
            html += `
            <div class="offerCard1">
                <div class="offerInfor1">
                    <img src="${item.img}" class="img" alt="Social Media BodyWork">
                </div>
            </div>
            `;
        });
        document.getElementById("displayOfferData1").innerHTML = html;
    }
}

// =========================================footer code==============================================================
let account_drop_btn = document.getElementById('myAccount');
let dropAccount = document.getElementById('account');
account_drop_btn.addEventListener('click',()=>{
    dropAccount.classList.toggle('open_account')
})

//==================================================nav bar code=======================================================
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

// drop_1.addEventListener('click',function(){
//     dropdowns[0].classList.toggle("open-dropdown")
// })



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
    sub_cat_drop[i].addEventListener('mouseover',()=>{
    //    console.log(sub_cat_sub_el[3])
       event.target.childNodes[1].classList.toggle("open-sub-category")
            var a = event.target.parentNode.classList;
  
    })
    sub_cat_drop[i].addEventListener('mouseleave',()=>{
        //    console.log(sub_cat_sub_el[3])
            event.target.childNodes[1].classList.toggle("open-sub-category")

    })
}

//Mobile Nav slide
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