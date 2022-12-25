import { products } from "./dummyData.js";
import { initSwiper } from "./swiper.js";
export const productsList = () => {
  const $ = (id) => document.getElementById(id);
  const $product_grid = $("product_grid");
  const $btnCart = $("btnCart");
  const $cart = $("cart");
  const $cart_close = document.querySelector("#cart .cart__content--close");
  const $body = document.querySelector("body");
  const $cartItems = $("cartItems");
  const $total = $("total");
  let cartCounter = 0;
  let cartList = [];
  let total = 0;
  let cartOpen = false;
  const generateStars = (stars) => {
    let starsHtml = "";
    for (let i = 0; i < 5; i++)
      i < stars
        ? (starsHtml = starsHtml + '<i class="bi-star-fill"></i>')
        : (starsHtml = starsHtml + '<i class="bi-star"></i>');
    return starsHtml;
  };

  const clickHandler = (index) => {
    let product = products[index];
    cartCounter++;
    renderCartCounterHtml();
    addProductToCart(product);
  };

  const btnCartClickHandler = () => {
    $btnCart.addEventListener("click", () => {
      cartOpen = !cartOpen;
      cartOpen
        ? ($body.style.overflow = "hidden")
        : ($body.style.overflow = "auto");
      $cart.classList.toggle("cart--visible");
      renderCartDetailHtml();
    });
    $cart_close.addEventListener("click", () => {
      cartOpen = !cartOpen;
      $body.style.overflow = "auto";
      $cart.classList.remove("cart--visible");
    });
  };

  const saveInLocalStorage = () => {
    let cartDetail = [];
    cartDetail.push({ cartList: cartList, total: total });
    localStorage.setItem("cartDetail", JSON.stringify(cartDetail));
  };

  const addProductToCart = (product) => {
    cartList.push(product);
    product.discount
      ? (total += (product.price * (100 - product.discount)) / 100)
      : (total += product.price);
    saveInLocalStorage();
  };

  const removeProductToCart = (index) => {
    const product = cartList[index];
    product.discount
      ? (total -= (product.price * (100 - product.discount)) / 100)
      : (total -= product.price);
    cartList.splice(index, 1);
    cartCounter--;
    renderCartCounterHtml();
    renderCartDetailHtml();
    saveInLocalStorage();
  };

  const renderCartCounterHtml = () => {
    $btnCart.innerHTML =
      cartCounter > 0
        ? ` <span class="cart__indicator" >${cartCounter}</span>`
        : "";
  };

  const renderCartDetailHtml = () => {
    let cartHtml = cartList.reduce((acc, item) => {
      return (
        acc +
        `<div class="cart__item" > <div class="cart__item-image">
        <img src="${item.img[0]}" alt="" />
      </div>
      <div class="cart__item-body flex-1">
        <h4 class="product__name ">${item.name}</h4>
        <p class="product__description">
          ${item.description}
        </p>
        <div class="product__cost f-elements gap-sm ">
            <p class="product__price  ${
              item.discount ? "text-crossed" : "text-red text-bold"
            }">S/ ${item.price.toFixed(2)}</p>
            ${
              item.discount
                ? '<p class="product__discount">-' +
                  item.discount +
                  '%</p><p class="product__finalPrice">S/ ' +
                  ((item.price * (100 - item.discount)) / 100).toFixed(2) +
                  "</p>"
                : ""
            }
            
          </div>
      </div>

      <div class="cart__item-action" id="btnRemove">
        <i class="bi-trash-fill"></i>
      </div> </div>`
      );
    }, "");
    $cartItems.innerHTML = cartHtml;
    $total.innerHTML = total.toFixed(2);
    const $btnRemove = document.querySelectorAll("#btnRemove");
    $btnRemove.forEach(($option, index) => {
      $option.addEventListener("click", () => removeProductToCart(index));
    });
  };

  const renderProducts = () => {
    let html = products.reduce((acumulator, product) => {
      return (
        acumulator +
        ` <div class="product__item">
      <div class="swiper swiper__product">
        <div class="swiper-wrapper">
        ${product.img.reduce((acc, image, index, array) => {
          return (
            acc +
            `<div class="${
              array.length > 1 ? "swiper-slide" : ""
            } "><img class="product__image ${
              !product.stock > 0 ? "filter-gray" : ""
            }" src="${image}" alt=""/></div> `
          );
        }, "")}
         
        </div>
        ${
          product.img.length > 1
            ? ' <div class="product__image-button-left"><i class="bi-chevron-left"></i></div><div class="product__image-button-right"><i class="bi-chevron-right"></i></div><div class="swiper-pagination"></div>'
            : ""
        }
       
      </div>
      ${
        !product.stock > 0
          ? ' <div class="product__sold-out">AGOTADO</div>'
          : ""
      }
      <div class="product__content">
          <h2 class="product__name ">${product.name}</h2>
          <div class="product__cost f-elements gap-sm ">
            <p class="product__price  ${
              product.discount ? "text-crossed" : "text-red text-bold"
            }">S/ ${product.price.toFixed(2)}</p>
            ${
              product.discount
                ? '<p class="product__discount">-' +
                  product.discount +
                  '%</p><p class="product__finalPrice">S/ ' +
                  ((product.price * (100 - product.discount)) / 100).toFixed(
                    2
                  ) +
                  "</p>"
                : ""
            }
            
          </div>
  
        <p class="product__description">
          ${product.description}
        </p>
        <div class="product__rating">
          ${
            product.stars > 0
              ? generateStars(product.stars)
              : '<i class="bi-star"></i><i class="bi-star"></i><i class="bi-star"></i><i class="bi-star"></i><i class="bi-star"></i>'
          }
        
        </div>
        <div class="product__button f-elements">
          <button id='btnAdd' class="">Agregar</button>
        </div>
      </div>
    </div>`
      );
    }, "");
    $product_grid.innerHTML = html;
    const $btnAdd = document.querySelectorAll("#btnAdd");
    $btnAdd.forEach(($option, index) => {
      $option.addEventListener("click", () => clickHandler(index));
    });
    initSwiper();
  };

  const init = () => {
    let cartDetail = JSON.parse(localStorage.getItem("cartDetail"));
    cartDetail = cartDetail ? cartDetail[0] : null;
    if (cartDetail) {
      cartList = cartDetail.cartList;
      cartCounter = cartDetail.cartList.length;
      total = cartDetail.total;
    }
    if (cartCounter > 0) renderCartCounterHtml();
    renderProducts();
    btnCartClickHandler();
  };

  init();
};
