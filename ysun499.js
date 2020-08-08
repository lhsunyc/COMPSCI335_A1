// Javascript Document
// let menuitems = document.getElementById("menu");
// let sections = menuitems.getElementsByClassName("menu-item");

// for(let i=0; i<sections.length; i++){
//     sections[i].addEventListener("click", function(){
//        displayPage(this);
//        let currentpage = document.getElementsByClassName("active");
//        currentpage[0] = currentpage[0].className.replace(" active","");
//        this.className += " active";
//     });
// }

// initialise
news();
DisplayProduct();

function displayPage(that){
    let sectionpage = that.id + "page";
    let sections = document.getElementsByClassName("section");
    for(let i=0; i<sectionpage.length; i++){
        if(sections[i].id == sectionpage){
            sections[i].style.display = "block";
        }else{
            sections[i].style.display = "none";
        }
    }
}

function toggleMenuOn() {
    let menu = document.getElementsByClassName("menu-item-small");
    for(let i=0; i<menu.length; i++){
        menu[i].style.display = "flex";
    }
    document.getElementById("icon-open").style.display = "none";
    document.getElementById("icon-close").style.display = "inline-block";
}

function toggleMenuOff() {
    let menu = document.getElementsByClassName("menu-item-small");
    for(let i=0; i<menu.length; i++){
        menu[i].style.display = "none";
    }
    document.getElementById("icon-open").style.display = "inline-block";
    document.getElementById("icon-close").style.display = "none";
}

function DisplayProduct(){
    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/items', 
    { 
        headers : {
             "Accept" : "application/json",
        },
    }); 
    const streamPromise = fetchPromise.then((response) => response.json());

    let section = document.getElementById("productpage");
    let imgurl = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id=";

    const get = (data) => {
        console.log(data);
        let products, image, ItemId, Origin, Price, Title, Type, button;
        for (let i=0; i<data.length; i++){
            products = document.createElement("div");
            products.className += "products";
            image = document.createElement("img");
            Title = document.createElement("h3")
            Origin = document.createElement("h3");
            Price = document.createElement("h3");
            Type = document.createElement("h3")
            button = document.createElement("button");
            
            ItemId = data[i].ItemId;
            image.src = imgurl + ItemId;
            products.id += ItemId;
            Title.innerHTML = data[i].Title;
            Origin.innerHTML = "Made in " + data[i].Origin;
            Price.innerHTML = "$" + data[i].Price;
            Type.innerHTML = data[i].Type;
            button.innerHTML = "Buy";

            products.appendChild(image);
            products.appendChild(Title);
            products.appendChild(Origin);
            products.appendChild(Type);
            products.appendChild(Price);
            products.appendChild(button)
            section.appendChild(products);
        }
    }
    streamPromise.then(get);
}

function searchProducts(){
    
    document.querySelectorAll('.products').forEach(function(element) {
        element.style.display = "none";
    })

    let input = document.getElementById("searchInput").value;
    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/search?term=' + input, 
    { 
        headers : {
             "Accept" : "application/json",
        },
    }); 
    const streamPromise = fetchPromise.then((response) => response.json());

    const get = (data) => {
        console.log(data);
        let ItemId;

        for (let i=0; i<data.length; i++){
            ItemId = data[i].ItemId;
            document.getElementById(ItemId).style.display = "inline-table";
        }
    }
    streamPromise.then(get);
}

function news(){
    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news', 
        { 
            headers : {
                 "Accept" : "application/json",
            },
        }); 
    const streamPromise = fetchPromise.then((response) => response.json());

    let section = document.getElementById("newspage");
    
    const update = (data) => {
        console.log(data);
        let newsfeed, titleField, image, pubDateField, descriptionField, linkField;
        for (let i=0; i<data.length; i++){
            newsfeed = document.createElement("a");
            titleField = document.createElement("h3");
            image = document.createElement("img");
            pubDateField = document.createElement("h4");
            descriptionField = document.createElement("h5");
            linkField = document.createElement("link");
            
            titleField.innerHTML = data[i].titleField;
            image.src = data[i].enclosureField.urlField;
            pubDateField.innerHTML = data[i].pubDateField;
            descriptionField.innerHTML = data[i].descriptionField;
            hr = document.createElement("hr")

            newsfeed.appendChild(linkField);
            newsfeed.setAttribute("href",data[i].linkField);
            newsfeed.appendChild(titleField);
            newsfeed.appendChild(image);
            newsfeed.appendChild(linkField);
            newsfeed.appendChild(pubDateField);
            newsfeed.appendChild(descriptionField);
            newsfeed.appendChild(hr);
            section.appendChild(newsfeed);
        }
    }
    streamPromise.then(update);
}

function postComment(){
    let name, comment, jcmt;
    name = document.getElementById("fullname").value;
    comment = document.getElementById("comment").value;
    jcmt = JSON.stringify(comment);

    const fetchPromise = fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/comment?name=" + name, 
        { 
            headers : { 
            "Content-Type" : "application/json", 
        }, 
        method : "POST", 
        body : jcmt 
    });

    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then(result => refresh());

    function refresh(){
        document.getElementById('iframeComment').src = document.getElementById('iframeComment').src;
        document.getElementById("fullname").value = "";
        document.getElementById("comment").value = "";
    }
}
