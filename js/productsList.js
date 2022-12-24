import { products } from "./dummyData.js";
import { initSwiper } from "./swiper.js";
export const productsList = () => {
  const $ = (id) => document.getElementById(id);
  const $product_grid = $("product_grid");

  const generateStars = (stars) => {
    let starsHtml = "";
    for (let i = 0; i < 5; i++) {
      if (i < stars) {
        starsHtml = starsHtml + '<i class="bi-star-fill"></i>';
      } else {
        starsHtml = starsHtml + '<i class="bi-star"></i>';
      }
    }
    return starsHtml;
  };

  const clickHandler = (index) => {
    console.log(index);
  };

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
    ${!product.stock > 0 ? ' <div class="product__sold-out">AGOTADO</div>' : ""}
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
                ((product.price * (100 - product.discount)) / 100).toFixed(2) +
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
