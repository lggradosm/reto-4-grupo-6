'use strict';

const nav = document.querySelector('nav');
const iconMenu = document.getElementById('icon-menu');
const iconClose = document.getElementById('icon-close');
const listHeader = document.querySelector('.list--header');


document.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scroll', window.scrollY > 0);
});

iconMenu.addEventListener('click', () => {
  // listHeader.style.pointerEvents = 'auto';
  // listHeader.style.opaity = 1;
  listHeader.classList.add('list--header-show');

});

iconClose.addEventListener('click', () => {
  listHeader.classList.remove('list--header-show');
});

const swiper = new Swiper('.swiper', {
  autoplay: {
    delay: 3000,
  },
  // Optional parameters
  direction: 'vertical',
  loop: true,
  Speed: 5000,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  /*scrollbar: {
    el: '.swiper-scrollbar',
  },*/
});

const PRODUCTOS_CRUD_DATA = 'tienda-de-ropa';
const productos = JSON.parse(localStorage.getItem(PRODUCTOS_CRUD_DATA)) ?? [];

const createProducto = () => {
  const documentFormProducto = document.forms['formProducto'];
  const cod = documentFormProducto.cod.value;
  const name = documentFormProducto.name.value;
  const stock = documentFormProducto.stock.value;
  const price = documentFormProducto.price.value;
  const desc = documentFormProducto.desc.value;
  const imgUrl = documentFormProducto.imgUrl.value;
  const grade = documentFormProducto.grade.value;
  productos.push({ cod, name, stock, price, desc, imgUrl, grade });
  localStorage.setItem(PRODUCTOS_CRUD_DATA, JSON.stringify(productos));
  readProductos();

};

const readProductos = () => {
  const tBodyProductos = document.getElementById('tBodyProductos');
  tBodyProductos.innerHTML = '';
  productos.forEach((element, index) => {
    const { cod, name, stock, price, desc, imgUrl, grade } = element;
    tBodyProductos.innerHTML += `
    <tr>
      <td>${index + 1}</td>
      <td>${cod}</td>
      <td>${name}</td>
      <td>${stock}</td>
      <td>${`S/. ` + price}</td>
      <td>${desc + ` %`}</td>
      <td>
        <img 
        src="${imgUrl}"
        alt= "${name}" class="img-fluid" style="max-width: 128px" />
      </td>
      <td>${grade}</td>
      <td>
      <button 
        class="btn btn-primary m-1"
        onclick="readProducto(${index})"
        >
        🖊
      </button>
      <button 
        class="btn btn-danger m-1"
        onclick="deleteProducto(${index})"
        >
        🗑
      </button>
      </td>
    </tr>
  `;
  });
};

const readProducto = (index) => {
  const documentFormProducto = document.forms['formProducto'];
  const producto = productos.slice(index, index + 1)[0];
  const { cod, name, stock, price, desc, imgUrl, grade } = producto;
  documentFormProducto.index.value = index;
  documentFormProducto.cod.value = cod;
  documentFormProducto.name.value = name;
  documentFormProducto.stock.value = stock;
  documentFormProducto.price.value = price;
  documentFormProducto.desc.value = desc;
  documentFormProducto.imgUrl.value = imgUrl;
  documentFormProducto.grade.value = grade;
  document.getElementById('button').innerText = 'Editar';
};

const updateProducto = (index) => {
  const documentFormProducto = document.forms['formProducto'];
  const cod = documentFormProducto.cod.value;
  const name = documentFormProducto.name.value;
  const stock = documentFormProducto.stock.value;
  const price = documentFormProducto.price.value;
  const desc = documentFormProducto.desc.value;
  const imgUrl = documentFormProducto.imgUrl.value;
  const grade = documentFormProducto.grade.value;
  productos.splice(index, 1, { cod, name, stock, price, desc, imgUrl, grade });
  localStorage.setItem(PRODUCTOS_CRUD_DATA, JSON.stringify(productos));
  documentFormProducto.reset();
  readProductos();
  document.getElementById('button').innerText = 'Crear';
};

const deleteProducto = (index) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success mx-1',
      cancelButton: 'btn btn-danger mx-1'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: '¿Estás seguro?',
    text: "No podrás rehacer esta acción!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, Elimínalo!',
    cancelButtonText: 'No, Cancela!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      productos.splice(index, 1);
      localStorage.setItem(PRODUCTOS_CRUD_DATA, JSON.stringify(productos));
      readProductos();
      swalWithBootstrapButtons.fire(
        'Eliminado!',
        'Tu registro ha sido eliminado.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'Tu registro está a salvo :)',
        'error'
      )
    }
  })
};


const documentReady = () => {
  const formProducto = document.getElementById('formProducto');

  const submitProducto = (e) => {
    e.preventDefault();
    const index = document.getElementById('index').value;
    if (index === '') {
      createProducto();
    } else {
      updateProducto(index);
    }
  };

  readProductos();
  formProducto.addEventListener('submit', submitProducto);
};

document.addEventListener('DOMContentLoaded', documentReady);