"use strict";
import { navbar } from "./navbar.js";
import { productsList } from "./productsList.js";
const $ = (id) => document.getElementById(id);

const documentReady = () => {
  navbar();
  productsList();
};

document.addEventListener("DOMContentLoaded", documentReady);
