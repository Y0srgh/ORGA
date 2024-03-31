const dropdown = document.querySelector(".dropdown");
const select = dropdown.querySelector(".select");
const caret = dropdown.querySelector(".caret");
const menu = dropdown.querySelector(".menu");
const options = dropdown.querySelectorAll(".menu li");
const selected = dropdown.querySelector(".selected");

select.addEventListener("click", () => {
  select.classList.toggle("select-clicked");
  caret.classList.toggle("caret-rotate");
  menu.classList.toggle("menu-open");
});

options.forEach((option) => {
  option.addEventListener("click", (event) => {
    if (!option.classList.contains("disabled")) {
      selected.innerText = option.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
      options.forEach((opt) => {
        opt.classList.remove("active");
      });
      option.classList.add("active");
      if (option.innerText !== "your type") {
        dropdown.querySelector(".menu li:first-child").classList.add("disabled");
      }
    }
    event.stopPropagation(); // Stop event propagation to prevent toggling the dropdown
  });
});
