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

    var timeImage = setInterval(volgendefoto, 3000);

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
            timeImage = setInterval(volgendefoto, 3000)
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
window.addEventListener("load", getOfferData)

function getOfferData(){

    let pageCount = 1

    document.getElementById("rightOfferBtn").addEventListener("click", function(){
        pageCount++
        if(pageCount>2){
            pageCount = 2
            fetch(`http://localhost:3000/offer?_page=${pageCount}&_limit=4`).then(response => response.json()).then(data => displayOfferData(data)).catch(error => error)
                document.getElementById("leftOfferBtn").style.display = "block"
                document.getElementById("rightOfferBtn").style.display = "none"
        }
        else{
            fetch(`http://localhost:3000/offer?_page=${pageCount}&_limit=4`).then(response => response.json()).then(data => displayOfferData(data)).catch(error => error)
                document.getElementById("leftOfferBtn").style.display = "block"
                document.getElementById("rightOfferBtn").style.display = "none"
        }
    })

    document.getElementById("leftOfferBtn").addEventListener("click", function(){
        pageCount--
        if(pageCount == 0 || pageCount < 1){
            pageCount = 1
            fetch(`http://localhost:3000/offer?_page=${pageCount}&_limit=4`).then(response => response.json()).then(data => displayOfferData(data)).catch(error => error)
            document.getElementById("leftOfferBtn").style.display = "none"
            document.getElementById("rightOfferBtn").style.display = "block"
        }
        else{
            fetch(`http://localhost:3000/offer?_page=${pageCount}&_limit=4`).then(response => response.json()).then(data => displayOfferData(data)).catch(error => error)
            document.getElementById("leftOfferBtn").style.display = "none"
            document.getElementById("rightOfferBtn").style.display = "block"
        }
    })
    fetch("http://localhost:3000/offer?_page=1&_limit=4").then(response => response.json()).then(data => displayOfferData(data)).catch(error => error)

    function displayOfferData(data){
        let html = ""
        for(i in data){
            let name = data[i].name
            let offer= data[i].offerPrice
            let desc = data[i].Description
            let id = data[i].id

            html+= `
            <div id="offerCard">
                <div id="offerInfor">
                    <p class="firstPara">${name}</p>
                    <p class="secondPara">${offer}</p>
                    <p class="thirdPara">${desc}</p>
                </div>
                <button class="shopBtn">SHOP</button>
            </div>
            `
        }
        document.getElementById("displayOfferData").innerHTML = html
    }
}
//=================================================New Products Display=================================================
window.addEventListener("load", getNewProducts)

function getNewProducts(){

    let pageCount = 1

    if(pageCount == 1){
        document.getElementById("pNavBtn1").style.display = "none"
        document.getElementById("pNavBtn2").style.display = "block"
    }

    document.getElementById("pNavBtn2").addEventListener("click", function(){
        pageCount++
        if(pageCount>2){
            pageCount = 3
            fetch(`http://localhost:3000/Fresh?_page=${pageCount}&_limit=3`).then(response => response.json()).then(data => displayNewItem(data)).catch(error => error)
                document.getElementById("pNavBtn1").style.display = "block"
                document.getElementById("pNavBtn2").style.display = "none"
        }
        else{
            fetch(`http://localhost:3000/Fresh?_page=${pageCount}&_limit=3`).then(response => response.json()).then(data => displayNewItem(data)).catch(error => error)
                document.getElementById("pNavBtn1").style.display = "block"
                document.getElementById("pNavBtn2").style.display = "block"
        }
    })

    document.getElementById("pNavBtn1").addEventListener("click", function(){
        pageCount--
        console.log(pageCount)
        if(pageCount == 1 || pageCount < 1){
            pageCount = 1
            fetch(`http://localhost:3000/Fresh?_page=${pageCount}&_limit=3`).then(response => response.json()).then(data => displayNewItem(data)).catch(error => error)
            document.getElementById("pNavBtn1").style.display = "none"
            document.getElementById("pNavBtn2").style.display = "block"
        }
        else{
            fetch(`http://localhost:3000/Fresh?_page=${pageCount}&_limit=3`).then(response => response.json()).then(data => displayNewItem(data)).catch(error => error)
            document.getElementById("pNavBtn1").style.display = "block"
            document.getElementById("pNavBtn2").style.display = "block"
        }
    })
    fetch(`http://localhost:3000/Fresh?_page=1&_limit=3`).then(response => response.json()).then(data => displayNewItem(data)).catch(error => console.log(error))

    function displayNewItem(data){
        let html = ""
        
        for(i in data){

            let id = data[i].id
            let img = data[i].img
            let name = data[i].name
            let shr_Desc = data[i].Short_Description
            let price = data[i].price
            let desc = data[i].Description

            html+=`
            <div id="displayProduct_Card">
                <div id="card_image" onmouseover="quickViewIn(${id})" onmouseout="quickViewOut(${id})">
                    <img src="${img}" class="img" alt="">
                </div>
                <div class="card_info">
                    <p class="card_info_para">${name}</p>
                    <p class="card_info_para_desc">${shr_Desc}</p>
                </div>
                <button class="card_AddCartBtn">ADD TO BAG</button>
                <div class="flat" id="quickViewDiv" onmouseover="quickViewIn(${id})" onmouseout="quickViewOut(${id})">
                    <i class="fas fa-eye">
                        <p>Quicklook</p>
                    </i>
                </div>
            </div>
            `
        }
        document.getElementById("displayProduct").innerHTML = html
    }

}

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
window.addEventListener("load", loadBanner)

function loadBanner(){
    fetch("http://localhost:3000/Banner").then(response => response.json()).then(data => displayBannerData(data)).catch(error => console.log(error))

    function displayBannerData(data){
        let html = ""
        for(let i in data){
            console.log(data[i])
            let img = data[i].img
            let link = data[i].link
            let desc = data[i].Description
            let id = data[i].id

            html+=`
            <div class="hompageMidPoster_card">
                <div class="hompageMidPoster_card_img">
                    <img src="${img}" class="img" alt="">
                </div>
                <div class="hompageMidPoster_card_info">
                    <p>${desc}</p>
                    <a href="#">${link}</a>
                </div>
            </div>
            `
        }
        document.getElementById("hompageMidPoster").innerHTML = html
    }
}

//=======================================Home Page Category==============================================================
window.addEventListener("load", getCategory)

function getCategory(){
    fetch("http://localhost:3000/Category").then(response => response.json()).then(data => displayCategory(data)).catch(error => console.log(error))

    function displayCategory(data){
        let html = ""
        
        for(let i in data){
            let img = data[i].img
            let name = data[i].name
            
            html+=`
            <div id="shopByCata_Card">
                <div id="shopByCata_Card_Img">
                    <img src="${img}" class="img" alt="">
                </div>
                <div id="shopByCata_Card_Cata">
                    <p>${name}</p>
                </div>
            </div>
            `
        }
        document.getElementById("shopByCata").innerHTML = html
    }
}
//================================================BodyWork Images=========================================================
window.addEventListener("load", getBodyWorkData)

function getBodyWorkData(){

    let pageCount = 1

    document.getElementById("rightOfferBtn1").addEventListener("click", function(){
        pageCount++
        if(pageCount>2){
            pageCount = 2
            fetch(`http://localhost:3000/atBodyWorks?_page=${pageCount}&_limit=4`).then(response => response.json()).then(data => displayBodyWorkData(data)).catch(error => error)
                document.getElementById("leftOfferBtn1").style.display = "block"
                document.getElementById("rightOfferBtn1").style.display = "none"
        }
        else{
            fetch(`http://localhost:3000/atBodyWorks?_page=${pageCount}&_limit=4`).then(response => response.json()).then(data => displayBodyWorkData(data)).catch(error => error)
                document.getElementById("leftOfferBtn1").style.display = "block"
                document.getElementById("rightOfferBtn1").style.display = "none"
        }
    })

    document.getElementById("leftOfferBtn1").addEventListener("click", function(){
        pageCount--
        if(pageCount == 0 || pageCount < 1){
            pageCount = 1
            fetch(`http://localhost:3000/atBodyWorks?_page=${pageCount}&_limit=4`).then(response => response.json()).then(data => displayBodyWorkData(data)).catch(error => error)
            document.getElementById("leftOfferBtn1").style.display = "none"
            document.getElementById("rightOfferBtn1").style.display = "block"
        }
        else{
            fetch(`http://localhost:3000/atBodyWorks?_page=${pageCount}&_limit=4`).then(response => response.json()).then(data => displayBodyWorkData(data)).catch(error => error)
            document.getElementById("leftOfferBtn1").style.display = "none"
            document.getElementById("rightOfferBtn1").style.display = "block"
        }
    })
    fetch("http://localhost:3000/atBodyWorks?_page=1&_limit=4").then(response => response.json()).then(data => displayBodyWorkData(data)).catch(error => error)

    function displayBodyWorkData(data){
        let html = ""
        for(i in data){
            let img = data[i].img

            html+= `
            <div id="offerCard1">
            <div id="offerInfor1">
                <img src="${img}" class="img" alt="">
            </div>
        </div>
            `
        }
        document.getElementById("displayOfferData1").innerHTML = html
    }
}
