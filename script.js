var modal = document.getElementById("myModal");
var openModalBtn = document.getElementById("openModalBtn");
var closeBtn = document.getElementsByClassName("close")[0];

openModalBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}