const first_img = document.getElementById("first_button_img");
const second_img = document.getElementById("second_button_img");
const third_img = document.getElementById("third_button_img");
const button = document.querySelector(".header_button");
const click_list = document.querySelector(".click_list")


let count = 0;
button.addEventListener("click", (e) => {
    count++
    if (first_img.classList.contains("animation1-reverse")) {
        first_img.classList.remove("animation1-reverse");
        third_img.classList.remove("animation2-reverse");
        second_img.classList.remove("animation3-reverse");
        click_list.classList.remove("animation-for-list-reverse")
    }
    second_img.classList.add("animation1");
    third_img.classList.add("animation2");
    first_img.classList.add("animation3");
    click_list.classList.add("animation-for-list")
    if (count === 2) {
        click_list.classList.add("animation-for-list-reverse")
        second_img.classList.add("animation3-reverse");
        first_img.classList.add("animation1-reverse");
        third_img.classList.add("animation2-reverse");
        count = 0
    }
    console.log(count)
})





