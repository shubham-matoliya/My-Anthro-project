let cart = document.querySelectorAll("button");
let number = JSON.parse(localStorage.getItem("cartNumbers")) || 0;
document.querySelector(".No-of-items").textContent = number;
let cartArray = [];

let sum = localStorage.setItem("subtotal", Number(0));

cart.forEach(function (elem) {
  elem.addEventListener("click", addToCart);
  elem.addEventListener("click", cartNumber);
});

function cartNumber() {
  let productNumber = localStorage.getItem("cartNumbers");
  productNumber = Number(productNumber);
  // or we can do productNumber = parseInt(productNumber)
  if (productNumber) {
    localStorage.setItem("cartNumbers", productNumber + 1);
    document.querySelector(".No-of-items").textContent = productNumber + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".No-of-items").textContent = 1;
  }
}
document
  .querySelector(".fa-cart-shopping")
  .addEventListener("mouseover", displayCart);
document.querySelector(".cart-box").addEventListener("mouseout", function () {
  return 0;
});

function addToCart(event) {
  let cartObj = {
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
  // to display item in cart in local storage start
  tempfun(cartObj);
  //end
}

function tempfun(cartObj) {
  // console.log(cartObj);
  let cartArray = JSON.parse(localStorage.getItem("inCart"));
  if (cartArray == null) {
    //no products yet
    let productsArray = [];
    let product = {
      productId: cartObj.product_id,
      productName: cartObj.productName,
      productPrice: cartObj.price,
      productQuantity: 1,
      productImage: cartObj.image,
    };
    productsArray.push(product);

    localStorage.setItem("inCart", JSON.stringify(productsArray));
    cartArray = JSON.parse(localStorage.getItem("inCart"));
    console.log("product is added for first time");
    displayCart(cartArray);
  } else {
    // products are already present
    cartArray = JSON.parse(localStorage.getItem("inCart"));
    let count = 0;

    cartArray.forEach(function (elem) {
      if (elem.productId == cartObj.product_id) {
        // we have to increase quantity
        elem.productQuantity = elem.productQuantity + 1;
        localStorage.setItem("inCart", JSON.stringify(cartArray));
        console.log("product quantity is increased");
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
        productPrice: cartObj.price,
        productQuantity: 1,
        productImage: cartObj.image,
      };
      cartArray.push(product);
      localStorage.setItem("inCart", JSON.stringify(cartArray));
      console.log("product is added");
      displayCart(cartArray);
    }
  }
}

function displayCart(cartArray) {
  let realCart = JSON.parse(localStorage.getItem("inCart")) || [];
  sum = localStorage.setItem("subtotal", Number(0));

  sub = Number(localStorage.getItem("subtotal"));

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
      productDescription.append(quantity, productPrice);
      details.append(itemName, productDescription);
      cart.append(img, details, cross);
      wrapper.append(cart);
      sub = sub + elem.productPrice * elem.productQuantity;
      let subtotal = document.querySelector(".subtotal");
      subtotal.innerText = "subtotal: " + sub;
      sum = localStorage.setItem("subtotal", sub);
    }
    if (elem.productQuantity == 0) {
      sub = sub + elem.productPrice * elem.productQuantity;
      let subtotal = document.querySelector(".subtotal");
      subtotal.innerText = "subtotal: " + sub;
      sum = localStorage.setItem("subtotal", sub);
    }
  });
}

function deletecart(event) {
  let item = event.target.parentNode.parentNode;
  let num = Number(localStorage.getItem("cartNumbers"));
  num--;
  console.log(num);
  localStorage.setItem("cartNumbers", num);
  document.querySelector(".No-of-items").textContent = num;
  let price =
    event.target.parentNode.parentNode.querySelector(".price").innerText;
  // console.log(price);
  let Id = event.target.parentNode.parentNode.getAttribute("id");
  // console.log(Id);
  let cartArray = JSON.parse(localStorage.getItem("inCart"));
  cartArray.forEach(function (elem) {
    if (elem.productId == Id) {
      elem.productQuantity--;
      localStorage.setItem("inCart", JSON.stringify(cartArray));
      if (elem.productQuantity == 0) {
        deleteit(item);
      }
    }
  });
  // event.target.parentNode.parentNode.remove();
  cartArray = JSON.parse(localStorage.getItem("inCart"));

  displayCart(cartArray);
}

function deleteit(item) {
  item.innerHTML = "";
}
