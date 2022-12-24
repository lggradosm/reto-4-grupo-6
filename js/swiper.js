export const initSwiper = () => {
  const swiperBanner = new Swiper(".swiper__banner", {
    spaceBetween: 50,
    // Optional parameters
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
  const swiperProduct = new Swiper(".swiper__product", {
    // Optional parameters
    direction: "horizontal",
    loop: true,

    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".product__image-button-right",
      prevEl: ".product__image-button-left",
    },
  });
};
