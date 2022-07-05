window.addEventListener("resize", addRequiredClass);

function addRequiredClass() {
  if (window.innerWidth < 860) {
    document.body.classList.add("mobile");
  } else {
    document.body.classList.remove("mobile");
  }
}
window.onload = addRequiredClass;

let hamburger = document.querySelector(".hamburger");
let navList = document.querySelector(".nav-list");
let bars = document.querySelectorAll(".hamburger span");
let isactive = false;
hamburger.addEventListener("click", function () {
  navList.classList.toggle("open");
  // setattribute will not add class it will replace the existing class with new class
  // code below is for animation in hamburger spans
  if (!isactive) {
    bars[0].style.transform = "rotate(45deg)";
    bars[1].style.opacity = "0";
    bars[2].style.transform = "rotate(-45deg";
    isactive = true;
  } else {
    bars[0].style.transform = "rotate(0deg)";
    bars[1].style.opacity = "1";
    bars[2].style.transform = "rotate(0deg";
    isactive = false;
  }
});
