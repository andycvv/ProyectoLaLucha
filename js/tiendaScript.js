const leftArrow = document.querySelector(".left__arrow");
const rightArrow = document.querySelector(".right__arrow");
const img = document.querySelector(".publicidad");
const arrows = document.querySelectorAll(".arrow");
const images = ["../assets/publicidad0.png", "../assets/publicidad1.png"];

// Carrusel Automático - Publicidad
let c = 0;
function carrusel(){
    c++;
    if(c>1) c=0;
    if(c<0) c=0;
    img.setAttribute("src", images[c]);
    img.style.opacity = "1";
    img.style.transition = "all 1s";
    setTimeout(cambio, 6000);
}

function cambio(){
    img.style.opacity = "0";
    img.style.transition = "all 1s";
    setTimeout(carrusel, 1000);
}

// Carrusel Manual - Publicidad
leftArrow.addEventListener("click", desplazarIzquierda);
rightArrow.addEventListener("click", desplazarDerecha);

function desplazarIzquierda(){  
    img.style.transition = "transform ease 1s";
    img.style.transform = "translateX(-120%)";
    setTimeout(()=>{
        if(img.getAttribute("src")=="../assets/publicidad0.png"){
            img.setAttribute("src", "../assets/publicidad1.png");
            c++;
        } else {
            img.setAttribute("src", "../assets/publicidad0.png");
            c--
        }
        img.style.transition = "none"
        img.style.transform = "translateX(100%)";
        setTimeout(()=>{
            img.style.transition = "transform ease 1s";  
            img.style.transform = "translateX(0%)";
        }, 10);
    }, 500);
}
function desplazarDerecha(){
    img.style.transition = "transform ease 1s";
    img.style.transform = "translateX(120%)";
    setTimeout(()=>{
        if(img.getAttribute("src")=="../assets/publicidad0.png"){
            img.setAttribute("src", "../assets/publicidad1.png");
            c++;
        } else {
            img.setAttribute("src", "../assets/publicidad0.png");
            c--;
        }
        img.style.transition = "none"
        img.style.transform = "translateX(-100%)";
        setTimeout(()=>{
            img.style.transition = "transform ease 1s";  
            img.style.transform = "translateX(0%)";
        }, 10);
    }, 500);
}

// Elegir categorías
const categorias = [...document.querySelectorAll(".nav__category")];
const productos = [...document.querySelectorAll(".grid__products")]
categorias.forEach((categoria, i)=>{
    categoria.addEventListener("click", ()=>{

        categorias.forEach(categoria => categoria.classList.remove("category__selected"));
        categoria.classList.toggle("category__selected");

        if(categorias[i].classList.contains("category__selected")){
            productos.forEach(producto => producto.classList.add("grid__products--ocultar"));
            productos[i].classList.remove("grid__products--ocultar");
        }

    });
});

// CERRAR CARRITO y ABRIR CARRITO
const closeCart = document.querySelector(".close__img");
closeCart.addEventListener("click", ()=>{
    document.querySelector(".back__black").classList.remove("back__black-add");
    document.body.style.height = "auto"
    document.body.style.overflow = "auto"
});

const openCart = document.querySelector(".icon__store");
openCart.addEventListener("click", ()=>{
    document.querySelector(".back__black").classList.add("back__black-add");
    document.body.style.height = "100vh"
    document.body.style.overflow = "hidden"
});

document.body.setAttribute("onload", "carrusel()"); 