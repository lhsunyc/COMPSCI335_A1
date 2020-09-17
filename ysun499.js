// Javascript Document

// initialise
news();
DisplayProduct();
getContact();

/**
 * This function is used to display the content of the section
 */
function displayPage(that) {
    let sectionpage = that.id + "page";
    let sections = document.getElementsByClassName("section");
    for (let i = 0; i < sectionpage.length; i++) {
        if (sections[i].id == sectionpage) {
            sections[i].style.display = "block";
        } else {
            sections[i].style.display = "none";
        }
    }
}

/**
 * This function is to toggle menu on
 */
function toggleMenuOn() {
    let menu = document.getElementsByClassName("menu-item-small");
    for (let i = 0; i < menu.length; i++) {
        menu[i].style.display = "flex";
    }
    document.getElementById("icon-open").style.display = "none";
    document.getElementById("icon-close").style.display = "inline-block";
}

/**
 * This function is to toggle menu off
 */
function toggleMenuOff() {
    let menu = document.getElementsByClassName("menu-item-small");
    for (let i = 0; i < menu.length; i++) {
        menu[i].style.display = "none";
    }
    document.getElementById("icon-open").style.display = "inline-block";
    document.getElementById("icon-close").style.display = "none";
}

/**
 * This function is to display products at product page
 */
function DisplayProduct() {
    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/items',
        {
            headers: {
                "Accept": "application/json",
            },
        });
    const streamPromise = fetchPromise.then((response) => response.json());

    let section = document.getElementById("productpage");
    let imgurl = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id=";

    const get = (data) => {
        let products, image, ItemId, Origin, Price, Title, Type, button;
        for (let i = 0; i < data.length; i++) {
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
            button.id += data[i].ItemId;
            button.setAttribute("onclick", "buyProduct(this.id)");

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

/**
 * This function is to serch item and shrink product list dynamically
 */
function searchProducts() {

    document.querySelectorAll('.products').forEach(function (element) {
        element.style.display = "none";
    })

    let input = document.getElementById("searchInput").value;
    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/search?term=' + input,
        {
            headers: {
                "Accept": "application/json",
            },
        });
    const streamPromise = fetchPromise.then((response) => response.json());

    const get = (data) => {
        let ItemId;
        for (let i = 0; i < data.length; i++) {
            ItemId = data[i].ItemId;
            document.getElementById(ItemId).style.display = "inline-table";
        }
    }
    streamPromise.then(get);
}

/**
 * This function is to fetch contact information
 */
function getContact() {
    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard');

    const streamPromise = fetchPromise.then((response) => response.text());

    let section = document.getElementById("locationpage");

    const update = (data) => {
        data = data.split("\n");
        let contact, address, phone, email, vcard, vcardhref;

        contact = document.createElement("div");
        contact.className += "contact";
        address = document.createElement("p");
        phone = document.createElement("p");
        email = document.createElement("p");
        vcard = document.createElement("p");
        vcardhref = document.createElement("a");

        for (let i = 0; i < data.length; i++) {
            let sentence = data[i].split(":");
            let hrefLink = document.createElement("a");

            if (sentence[0].includes("ADR")) {
                address.innerHTML = "Address: " + sentence[1].replace(';;', '');
            } else if (sentence[0].includes("TEL")) {
                phone.innerHTML = "Phone: ";
                hrefLink.setAttribute("href", "tel:" + sentence[1]);
                hrefLink.innerHTML = sentence[1];
                phone.appendChild(hrefLink);
            } else if (sentence[0].includes("EMAIL")) {
                email.innerHTML = "Email: ";
                hrefLink.setAttribute("href", "mailto:" + sentence[1]);
                hrefLink.innerHTML = sentence[1];
                email.appendChild(hrefLink);
            }
        }

        vcardhref.innerHTML = "Add us to your contact";
        vcardhref.setAttribute("href", "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard");

        vcard.appendChild(vcardhref);
        contact.appendChild(address);
        contact.appendChild(phone);
        contact.appendChild(email);
        contact.appendChild(vcard);
        section.appendChild(contact);
    }
    streamPromise.then(update);
}

/**
 * This function is to fetch news feed from server and display them at news page
 */
function news() {
    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news',
        {
            headers: {
                "Accept": "application/json",
            },
        });
    const streamPromise = fetchPromise.then((response) => response.json());

    let section = document.getElementById("newspage");

    const update = (data) => {
        let newsfeed, titleField, image, pubDateField, descriptionField, linkField;
        for (let i = 0; i < data.length; i++) {
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
            newsfeed.setAttribute("href", data[i].linkField);
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

/**
 * This function enables users to post comment at guest book page and review them
 */
function postComment() {
    let name, comment, jcmt;
    name = document.getElementById("fullname").value;
    comment = document.getElementById("comment").value;
    jcmt = JSON.stringify(comment);

    const fetchPromise = fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/comment?name=" + name,
        {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: jcmt
        });

    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then(result => refresh());

    function refresh() {
        document.getElementById('iframeComment').src = document.getElementById('iframeComment').src;
        document.getElementById("fullname").value = "";
        document.getElementById("comment").value = "";
    }
}

function registerUser() {
    let username, password, repeat, jreg;
    username = document.getElementById("username").value;
    password = document.getElementById("reg-password").value;
    repeat = document.getElementById("repeat-password").value;

    if (password != repeat) {
        alert("Password did not match, please confirm your password!");
    } else {
        const uri = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/register";
        let xhr = new XMLHttpRequest();

        xhr.open("POST", uri, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        jreg = JSON.stringify(
            {
                Name: username,
                Password: password
            }
        );

        xhr.send(jreg);

        xhr.onload = function () {
            document.getElementById("username").value = "";
            document.getElementById("reg-password").value = "";
            document.getElementById("repeat-password").value = "";
            document.querySelectorAll('.input.focus').forEach(function (element) {
                element.className = element.className.replace(" focus", "");
            })
            alert(xhr.responseText);
        }
    }
}

function buyProduct(itemID) {
    console.log(itemID);
    window.open('http://redsox.uoa.auckland.ac.nz/dsa/Service.svc/buy?id=' + itemID);
}
let inputs = document.getElementsByClassName("input");

for (i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("click", function () {
        if (this.className.includes('focus')) {

        } else {
            this.className += " focus";
        }
    });
}

function showpass() {
    let password = document.getElementById("password").value;
    let passwd = document.getElementsByClassName("show");
    if (password.length > 0) {
        for (i = 0; i < passwd.length; i++) {
            passwd[i].style.display = "flex";
        }
    } else {
        for (i = 0; i < passwd.length; i++) {
            passwd[i].style.display = "none";
        }
    }
}

const pass_field = document.querySelector('.password');
const show_btn = document.querySelector('.show');

show_btn.addEventListener('click', function () {
    if (pass_field.type == "password") {
        pass_field.type = "text";
        show_btn.style.color = "#3498db";
        show_btn.textContent = "HIDE";
    } else {
        pass_field.type = "password";
        show_btn.style.color = "#222";
        show_btn.textContent = "SHOW";
    }
});

const login = document.querySelector('#login');
const register = document.querySelector('#register');
let regPasswd = document.getElementById('reg-passwd');
let loginPasswd = document.getElementById('login-passwd');
let repeat = document.getElementById('repeat');
let loginButton = document.getElementById('login-btn');
let regButton = document.getElementById('reg-btn');

login.addEventListener('click', function () {
    if (login.className.includes("active")) {

    } else {
        login.className += "active";
        register.className = register.className.replace("active", "");
        regPasswd.style.display = "none";
        repeat.style.display = "none";
        loginPasswd.style.display = "block";
        regButton.style.display = "none";
        loginButton.style.display = "block";
        document.querySelectorAll('input').forEach(function (element) {
            element.value = "";
        })
        document.querySelectorAll('.input.focus').forEach(function (element) {
            element.className = element.className.replace(" focus", "");
        })
    }
});

register.addEventListener('click', function () {
    if (register.className.includes("active")) {

    } else {
        register.className += "active";
        login.className = login.className.replace("active", "");
        regPasswd.style.display = "block";
        repeat.style.display = "block";
        loginPasswd.style.display = "none";
        regButton.style.display = "block";
        loginButton.style.display = "none";
        document.querySelectorAll('input').forEach(function (element) {
            element.value = "";
        })
        document.querySelectorAll('.input.focus').forEach(function (element) {
            element.className = element.className.replace(" focus", "");
        })
    }
});

/** set time interval for key action to prevent fast typing issues*/
var flag = 0;
var t;
function openFlag() {
    t = setTimeout(function () { flag = 1; fireAction(); }, 100);
}
function closeFlag() {
    clearTimeout(t);
    flag = 0;
}
function fireAction() {
    if (flag) {
        searchProducts();
    }
}