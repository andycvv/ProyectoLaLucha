const cart = document.querySelector('.grid__cart');
const cartItems = document.querySelector('.grid__cart');
const cartTotals = document.querySelectorAll('.price__value');
const addToCartButtons = document.querySelectorAll('.prod__add');

let shoppingCart = {
  items: [],
  total: 0,
};

// Función para agregar un producto al carrito
function addToCart(productName, price, description, category) {
  const existingItem = shoppingCart.items.find((item) => item.product === productName);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    shoppingCart.items.push({ product: productName, quantity: 1, price: price, description:  description, category: category});
  }

  shoppingCart.total += price;
  updateCartDisplay();
}

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
  cartItems.innerHTML = ''; // Limpiar el contenido anterior

  shoppingCart.items.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `
        <div class="cart__item">
        <p class="item__category cart__flex--item">${item.category}</p>
        <div class="item__nombres cart__flex--item">
            <p class="item__name">${item.product}</p>
            <p class="item__description">${item.description}</p>
        </div>
        <div class="item__cantidad cart__flex--item">
            <img src="../assets/iconSumar.png" data-product="${item.product}" alt="add" class="img__add">
            <p class="cant__product">${item.quantity}</p>
            <img src="../assets/iconRestar.png" data-product="${item.product}" alt="decrease" class="img__decrease">
        </div>
        <p class="item__price cart__flex--item">S/ ${item.price}</p>
        </div>
    `
    cartItems.appendChild(cartItem);

    // Agregar un evento para el botón de aumentar
    const iconAdd = cartItem.querySelector('.img__add');
    iconAdd.addEventListener('click', () => {
      const productName = iconAdd.getAttribute('data-product');
      const product = shoppingCart.items.find((item) => item.product === productName);

      if (product) {
        product.quantity++;
        shoppingCart.total += product.price;
        updateCartDisplay();
      }
    });

    // Agregar un evento para el botón de disminuir
    const iconDecrease = cartItem.querySelector('.img__decrease');
    iconDecrease.addEventListener('click', () => {
      const productName = iconDecrease.getAttribute('data-product');
      const product = shoppingCart.items.find((item) => item.product === productName);

      if (product && product.quantity > 0) {
        product.quantity--;
        shoppingCart.total -= product.price;

        // Eliminar el elemento del array si la cantidad es 0
        if (product.quantity === 0) {
          const index = shoppingCart.items.indexOf(product);
          if (index > -1) {
            shoppingCart.items.splice(index, 1);
          }
        }

        updateCartDisplay();
      }
    });
  });

  cartTotals.forEach((cartTotal) => {
    cartTotal.innerText = shoppingCart.total.toFixed(2);
  });

  if (document.querySelector(".grid__cart").childElementCount >= 3) {
    document.querySelector(".grid__cart").style.overflow = "auto";
  }
}

// Agregar un evento a los botones "Agregar al Carrito"
addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productName = button.getAttribute('data-product');
    const price = parseFloat(button.getAttribute('data-price'));
    let category = "SÁNGUCHES"

    let description = button.parentElement.firstChild.nextSibling.textContent;

    if(button.parentElement.childElementCount===2){
      if(button.classList.contains("category0")){
        category = "JUGOS - BÁSICOS";
      } else if(button.classList.contains("category1")){
        category = "JUGOS - SURTIDOS";
      } else if(button.classList.contains("category2")){
        category = "JUGOS - CREMOSOS";
      } else if(button.classList.contains("category3")){
        category = "JUGOS - FROZEN";
      } else {
        category = "JUGOS - EMOLIENTES";
      }
      description = button.parentElement.previousElementSibling.lastElementChild.textContent;
      if(button.parentElement.parentElement.classList.contains("grid__prod--refresco")){
        category = "REFRESCOS";
      }
    }


    addToCart(productName, price, description, category);
    
    document.querySelector(".alert__add").style.transform = "translate(0%)";
    setTimeout(()=>{
      document.querySelector(".alert__add").style.transform = "translate(150%)";
    }, 2000)
  });
});


// PROCESO DE PAGO
let y = 0;
const payButtons = [...document.querySelectorAll(".pay__button")];
const backButton = document.querySelector(".back__button");
payButtons.forEach((payButton)=>{
  payButton.addEventListener("click",()=>{
    y++;
    if(y===1){
      document.querySelector(".info__cart").style.transform = "translateX(-150%)";
      document.querySelector(".info__cart").style.transition = "all 1s";
      document.querySelector(".info__pay").style.display = "flex";
      document.querySelector(".info__pay").style.flexDirection = "column";
      document.querySelector(".info__pay").style.transform = "translateX(150%)";

      setTimeout(()=>{
        document.querySelector(".info__cart").style.display = "none";
        document.querySelector(".info__pay").style.transform = "translateX(0%)";
        document.querySelector(".info__pay").style.transition = "all 1s";

      }, 400)
    } else if(y===2){
      document.querySelector(".info__pay").style.transform = "translateX(-150%)";
      document.querySelector(".info__pay").style.transition = "all 1s";
      document.querySelector(".purchase__complete").style.display = "flex";
      document.querySelector(".purchase__complete").style.transform = "translate(150%)";

      setTimeout(()=>{
        document.querySelector(".info__pay").style.display = "none";
        document.querySelector(".purchase__complete").style.transform = "translate(0%)";
        document.querySelector(".purchase__complete").style.transition = "all 1s";

        setTimeout(()=>{
          shoppingCart = {
            items: [],
            total: 0,
          }
          y=0;
          document.querySelector(".back__black").classList.remove("back__black-add");
          document.querySelector(".info__cart").style.display = "flex"
          document.querySelector(".info__cart").style.transform = ""
          document.querySelector(".purchase__complete").style.display = "none";
          document.querySelector(".purchase__complete").style.transform = "";
          updateCartDisplay();
          document.body.style.height = "";
          document.body.style.overflow = "";
        }, 3000);
      }, 500);

      const textInputs = document.querySelectorAll('input[type="text"]');
      textInputs.forEach((input) => {
        input.value = '';
      });

    }
    
  });
});

backButton.addEventListener("click", ()=>{
  y--;
  if(y===0){
    document.querySelector(".info__pay").style.transform = "translateX(150%)";
    document.querySelector(".info__pay").style.transition = "all 1s";
    setTimeout(()=>{
      document.querySelector(".info__cart").style.display = "flex";
      document.querySelector(".info__pay").style.display = "none";
      setTimeout(()=>{
        document.querySelector(".info__cart").style.transform = "translateX(0%)";
        document.querySelector(".info__cart").style.transition = "all 1s";
      },100)
    }, 350);
  }
});