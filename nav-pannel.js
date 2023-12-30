const elems = document.querySelectorAll(".elems");
const imgDiv = document.querySelector("#img-div");

let h;
let w;


elems.forEach((elem, index) => {
    let img = elem.getAttribute("data-image");
    let imgPosition = elem.getAttribute("data-background-position");

    elem.onmouseenter = (dets) => {
        h = elem.getAttribute("data-height");
        w = elem.getAttribute("data-width");

        imgDiv.style.backgroundPosition = imgPosition;
        imgDiv.style.height = h + "px";
        imgDiv.style.width = w + "px";
        imgDiv.style.backgroundImage = `url(${img})`;
        imgDiv.style.opacity = 1;
    }

    elem.onmouseleave = () => {
        imgDiv.style.opacity = 0;
    }



});

let xAx = 0;
document.onmousemove = (dets) => {
    if (xAx !== dets.x) {
        gsap.to(imgDiv, {
            rotate: 2 * (dets.x - xAx),
            duration: 3,
        });
        xAx = dets.x;
    }

    gsap.to(imgDiv, {
        left: dets.x - w / 2,
        top: dets.y - h / 2,
        duration: 0.5
    });
};