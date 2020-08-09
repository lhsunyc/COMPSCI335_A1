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
        let contact, address, phone, email, vcard, phonehref, emailhref, vcardhref;
        let sentence, addressLine, phoneLine, emailLine;
        let addressContent, phoneContent, emailContent;

        contact = document.createElement("div");
        contact.className += "contact";
        address = document.createElement("p");
        phone = document.createElement("p");
        email = document.createElement("p");
        vcard = document.createElement("p");

        phonehref = document.createElement("a");
        emailhref = document.createElement("a");
        vcardhref = document.createElement("a");

        sentence = data.split("\n");
        addressLine = sentence[4].split(";");
        addressContent = addressLine[4] + ", " + addressLine[5] + ", " + addressLine[6];

        phoneLine = sentence[3].split(";");
        phoneContent = phoneLine[2].split(":")[1];

        emailLine = sentence[5].split(":");
        emailContent = emailLine[1];

        address.innerHTML = "Address: " + addressContent;
        phonehref.innerHTML = "Phone: " + phoneContent;
        emailhref.innerHTML = "Email: " + emailContent;
        vcardhref.innerHTML = "Add us to your contact";

        phonehref.setAttribute("href", "tel:" + phoneContent);
        emailhref.setAttribute("href", "mailto:" + emailContent);
        vcardhref.setAttribute("href", "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard");

        phone.appendChild(phonehref);
        email.appendChild(emailhref);
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
