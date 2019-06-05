var element = document.querySelector("p");

element.addEventListener("input", function() {
    this.setAttribute("data-text", this.innerText);
});

document.getElementById('toggle').addEventListener('click', function () {
    if (document.body.classList.contains("no-animation")) {
     document.body.classList.remove("no-animation");
    } else {
        document.body.classList.add("no-animation");
    }
  });

