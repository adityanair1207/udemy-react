let backdrop = document.querySelector(".backdrop");
// console.log(backdrop);

let selectPlanButtons = document.querySelectorAll(".plan button");
let modal = document.querySelector(".modal");

for (let i = 0; i < selectPlanButtons.length; i++) {
  selectPlanButtons[i].addEventListener("click", () => {
    // modal.style.display = "block";
    // backdrop.style.display = "block";
    modal.classList.add("open");
    backdrop.classList.add("open");
  });
}

let closeModalButton = document.querySelector(".modal button");

const closeModal = () => {
  //   modal.style.display = "none";
  //   backdrop.style.display = "none";

  if (modal) {
    modal.classList.remove("open");
  }
  backdrop.classList.remove("open");
};

if (closeModalButton) {
  closeModalButton.addEventListener("click", closeModal);
}

backdrop.addEventListener("click", () => {
  //   mobileNav.style.display = "none";
  mobileNav.classList.remove("open");
  closeModal();
});

let hamburgerButton = document.querySelector(".toggle-button");
let mobileNav = document.querySelector(".mobile-nav");

hamburgerButton.addEventListener("click", () => {
  //   mobileNav.style.display = "block";
  //   backdrop.style.display = "block";
  mobileNav.classList.add("open");
  backdrop.classList.add("open");
});
