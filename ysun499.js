// Javascript Document
let menuitems = document.getElementById("menu");
let sections = menuitems.getElementsByClassName("menu-item");

for(let i=0; i<sections.length; i++){
    sections[i].addEventListener("click", function(){
       displayPage(this);
       let currentpage = document.getElementsByClassName("active");
       currentpage[0].className.replace(" active","");
       this.className += " active";
    });
}

function displayPage(that){
    let sectionpage = that.id + "page";
    let sections = document.getElementsByClassName("section");

    for(var i=0; i<sectionpage.length; i++){
        if(sections[i].id == sectionpage){
            sections[i].style.display = "block";
        }else{
            sections[i].style.display = "none";
        }
    }
}

function toggleMenuOn() {
    var menu = document.getElementsByClassName("menu-item");
    for(var i=0; i<menu.length; i++){
        menu[i].style.display = "flex";
    }
    document.getElementById("icon-open").style.display = "none";
    document.getElementById("icon-close").style.display = "inline-block";
}

function toggleMenuOff() {
    var menu = document.getElementsByClassName("menu-item");
    for(var i=0; i<menu.length; i++){
        menu[i].style.display = "none";
    }
    document.getElementById("icon-open").style.display = "inline-block";
    document.getElementById("icon-close").style.display = "none";
}

