
const header = document.querySelector("header");
const botonComenzar = document.querySelector(".header__cta");
const seccion1 = document.querySelector(".section1");
const seccion2 = document.querySelector(".section2");
const seccion3 = document.querySelector(".section3");
const footer = document.querySelector(".footer");


// COMENZAR
function ocultarSeccionesYFooter() {
    seccion1.style.display = "none";
    seccion2.style.display = "none";
    seccion3.style.display = "none";
    footer.style.display = "none";
}

function comenzar(event) {
    event.preventDefault();
    ocultarSeccionesYFooter();
    seccion1.style.display = "block";
    seccion2.style.display = "block";
    seccion3.style.display = "block";
    footer.style.display = "block";
    window.scrollTo({
        top: seccion1.offsetTop,
        behavior: "smooth"
    });
}

botonComenzar.addEventListener("click", comenzar);
ocultarSeccionesYFooter();

// carrusel de banners
let c = 0;
function carrusel(){
    header.style.transition = "1s all";
    if(c===3) c = 0;
    header.style.backgroundImage = `url(assets/banner${c}.jpg)`;
    c++;
    setTimeout(carrusel, 4000);
}

// imagenes y videos
document.querySelectorAll('.grid-item.video').forEach(videoItem => {
    const video = videoItem.querySelector('video');
    videoItem.addEventListener('mouseenter', () => {
      video.muted = false;
      video.play();
    });
  
    videoItem.addEventListener('mouseleave', () => {
      video.currentTime = 0;
      video.muted = true;
    });
});
  
//carta
const categorias = [...document.querySelectorAll(".carta__categoria")];
const productos = [...document.querySelectorAll(".grid__productos")]
categorias.forEach((categoria, i)=>{
    categoria.addEventListener("click", ()=>{

        categorias.forEach(categoria => categoria.classList.remove("carta__categoria--selected"));
        categoria.classList.toggle("carta__categoria--selected");

        if(categorias[i].classList.contains("carta__categoria--selected")){
            productos.forEach(producto => producto.classList.add("grid__products--ocultar"));
            productos[i].classList.remove("grid__products--ocultar");
        }

    });
});

document.body.setAttribute("onload", "carrusel()"); 