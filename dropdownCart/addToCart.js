let cart = document.querySelectorAll("button.quickshop");

let number = JSON.parse(localStorage.getItem("cartNumbers")) || 0;
if (number == 0) {
  document.querySelector(".subtotal").innerText = "subtotal: " + number;
}
document.querySelector(".No-of-items").textContent = number;
let cartArray = [];

let sum = localStorage.setItem("subtotal", Number(0));

cart.forEach(function (elem) {
  elem.addEventListener("click", showbox);
});

function showbox(event) {
  let box_cartObj = {
    image: event.target.parentNode.parentNode
      .querySelector(".out>img")
      .getAttribute("src")
      .toString(),
    price: event.target.parentNode.parentNode.querySelector(".price").innerText,
    product_id: event.target.parentNode.parentNode.getAttribute("id"),

    productName:
      event.target.parentNode.parentNode.querySelector(".productName")
        .innerText,
  };
  displayBoxContent(box_cartObj);
}

function displayBoxContent(elem) {
  // console.log(document.querySelector(".container2"));
  // console.log(elem);
  document
    .querySelector(".container2 > .product img")
    .setAttribute("src", elem.image);
  document.querySelector(".container2 > .product h2").innerText =
    elem.productName;
  document.querySelector(".container2 > .product .price").innerText =
    elem.price;
  document.querySelector(".container2 > .product #productid").innerText =
    elem.product_id;
  document
    .querySelector(".container2 .size input")
    .setAttribute("checked", "checked");
  document.querySelector(".container2 > .product #qty").value = 1;
  document.querySelector(".container2 #qty").classList.add(elem.product_id);
  document.querySelector(".container2").classList.add("show");

  document.querySelector("body").classList.add("popup");
  document.querySelector("header").classList.add("reduce-opacity");
  document.querySelector(".container").classList.add("reduce-opacity");
  document
    .querySelector(".container2 > .fa-regular")
    .addEventListener("click", function () {
      document.querySelector(".container2").classList.remove("show");
      document.querySelector("body").classList.remove("popup");
      document.querySelector("header").classList.remove("reduce-opacity");
      document.querySelector(".container").classList.remove("reduce-opacity");
    });
  document
    .querySelector(".container2 .add-to-basket")
    .addEventListener("click", cartNumber);

  document
    .querySelector(".show .add-to-basket")
    .addEventListener("click", solvemyproblem);
}

function solvemyproblem(event) {
  let target = event.target.parentNode.parentNode.parentNode.parentNode;
  let getsize = target.querySelectorAll(".size label input");
  let psize;
  getsize.forEach(function (elem) {
    let set;
    if (elem.checked) psize = elem.value;
  });

  let cartObj = {
    productSize: psize,
    productImage: target.querySelector("img").getAttribute("src"),
    productName: target.querySelector("h2").innerText,
    productPrice: target.querySelector(".price").innerText,
    productQuantity: target.querySelector("#qty").value,
    product_id: target.querySelector("#productid").innerText,
  };
  increaseQty(cartObj);
}
function getvalueofsize(event) {
  console.log(event.target.value);
}

function cartNumber() {
  let productNumber = localStorage.getItem("cartNumbers");
  productNumber = Number(productNumber);
  let qty = document.querySelector(".container2 #qty").value;
  qty = Number(qty);
  // console.log(typeof qty);
  // or we can do productNumber = parseInt(productNumber)
  if (productNumber) {
    localStorage.setItem("cartNumbers", productNumber + qty);
    document.querySelector(".No-of-items").textContent = productNumber + qty;
  } else {
    localStorage.setItem("cartNumbers", qty);
    document.querySelector(".No-of-items").textContent = qty;
  }
}
document
  .querySelector(".fa-cart-shopping")
  .addEventListener("mouseover", displayCart);
document.querySelector(".cart-box").addEventListener("mouseout", function () {
  return 0;
});

function increaseQty(cartObj) {
  // console.log(cartObj);
  let cartArray = JSON.parse(localStorage.getItem("inCart"));
  if (cartArray == null) {
    //no products yet
    let productsArray = [];
    let product = {
      productId: cartObj.product_id,
      productName: cartObj.productName,
      productPrice: cartObj.productPrice,
      productQuantity: cartObj.productQuantity,
      productImage: cartObj.productImage,
      productSize: cartObj.productSize,
    };
    productsArray.push(product);

    localStorage.setItem("inCart", JSON.stringify(productsArray));
    cartArray = JSON.parse(localStorage.getItem("inCart"));
    // console.log("product is added for first time");
    displayCart(cartArray);
  } else {
    // products are already present
    cartArray = JSON.parse(localStorage.getItem("inCart"));
    let count = 0;

    cartArray.forEach(function (elem) {
      if (
        elem.productId == cartObj.product_id &&
        elem.productSize == cartObj.productSize
      ) {
        console.log(cartArray);
        // we have to increase quantity

        elem.productQuantity =
          Number(elem.productQuantity) + Number(cartObj.productQuantity);
        localStorage.setItem("inCart", JSON.stringify(cartArray));
        // console.log("product quantity is increased");
        displayCart(cartArray);
      } else {
        count++;
      }
    });
    if (count == cartArray.length) {
      // we have to add product
      let product = {
        productId: cartObj.product_id,
        productName: cartObj.productName,
        productPrice: cartObj.productPrice,
        productQuantity: cartObj.productQuantity,
        productImage: cartObj.productImage,
        productSize: cartObj.productSize,
      };

      cartArray.push(product);
      localStorage.setItem("inCart", JSON.stringify(cartArray));
      console.log(cartArray);
      // console.log("product is added");
      displayCart(cartArray);
    }
  }
}

function displayCart(cartArray) {
  let realCart = JSON.parse(localStorage.getItem("inCart")) || [];
  sum = localStorage.setItem("subtotal", Number(0));

  sub = Number(localStorage.getItem("subtotal"));
  document.querySelector(".subtotal").innerText = "subtotal: " + sub;
  document.querySelector(".cart-wrapper").innerHTML = "";
  realCart.forEach(function (elem) {
    let cart = document.createElement("div");

    cart.setAttribute("class", "cart-item");
    cart.setAttribute("id", elem.productId);

    let img = document.createElement("img");

    img.setAttribute("src", elem.productImage);

    let details = document.createElement("div");

    details.setAttribute("class", "details");

    let itemName = document.createElement("h3");

    itemName.innerText = "Item Name";

    let productDescription = document.createElement("p");

    productDescription.innerText = elem.productName;

    let quantity = document.createElement("span");

    quantity.setAttribute("class", "quantity");

    quantity.innerText = "Quantity: " + elem.productQuantity;

    let productSize = document.createElement("span");

    productSize.setAttribute("class", "size");

    productSize.innerText = "Size: ";

    let productSizenmbr = document.createElement("span");

    productSizenmbr.setAttribute("id", "size");

    productSizenmbr.innerText = elem.productSize;

    productSize.append(productSizenmbr);

    let productPrice = document.createElement("span");

    productPrice.setAttribute("class", "price");

    productPrice.innerText = "Price: " + elem.productPrice;

    let cross = document.createElement("div");

    cross.setAttribute("class", "cancel");

    cross.addEventListener("click", deletecart);

    let xmark = document.createElement("i");

    xmark.setAttribute("class", "fa-solid fa-xmark");

    cross.append(xmark);
    let wrapper = document.querySelector(".cart-wrapper");
    console.log();
    if (elem.productQuantity > 0) {
      productDescription.append(quantity, productSize, productPrice);
      details.append(itemName, productDescription);
      cart.append(img, details, cross);
      wrapper.append(cart);
      sub = sub + elem.productPrice * elem.productQuantity;
      let subtotal = document.querySelector(".subtotal");
      subtotal.innerText = "subtotal: " + sub;
      localStorage.setItem("subtotal", sub);
    }
    // if (elem.productQuantity == 0) {
    //   sub = sub + elem.productPrice * elem.productQuantity;
    //   let subtotal = document.querySelector(".subtotal");
    //   subtotal.innerText = "subtotal: " + sub;
    //   localStorage.setItem("subtotal", sub);
    // }
  });
}

function deletecart(event) {
  let item = event.target.parentNode.parentNode;
  let num = Number(localStorage.getItem("cartNumbers"));
  num--;
  // console.log(num);
  localStorage.setItem("cartNumbers", num);
  document.querySelector(".No-of-items").textContent = num;
  // let price =
  //   event.target.parentNode.parentNode.querySelector(".price").innerText;
  let size =
    event.target.parentNode.parentNode.querySelector("#size").innerText;

  let Id = event.target.parentNode.parentNode.getAttribute("id");
  // console.log(price, size, Id);
  // console.log(Id);
  let cartArray = JSON.parse(localStorage.getItem("inCart"));
  for (let i = 0; i < cartArray.length; i++) {
    if (cartArray[i].productId == Id && cartArray[i].productSize == size) {
      cartArray[i].productQuantity--;

      localStorage.setItem("inCart", JSON.stringify(cartArray));
      if (Number(cartArray[i].productQuantity) == 0) {
        cartArray.splice(i, 1);
        item.remove();
        localStorage.setItem("inCart", JSON.stringify(cartArray));
      }
    }
  }
  // event.target.parentNode.parentNode.remove();
  cartArray = JSON.parse(localStorage.getItem("inCart"));

  displayCart(cartArray);
}
