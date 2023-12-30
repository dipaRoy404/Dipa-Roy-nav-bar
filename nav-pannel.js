let tl = gsap.timeline();
document.addEventListener("DOMContentLoaded", function () {
  const progressText = document.querySelector(".progress");
  const loader = document.querySelector(".loader");

  // Simulated delay for content loading (milliseconds)
  const delay = 2000; // Adjust this value based on your content loading time

  let loaded = 0;

  // Simulate content loading progress
  const interval = setInterval(function () {
    loaded += Math.random() * 10; // Simulating content loaded
    loaded = Math.min(loaded, 100); // Cap loaded content at 100%
    progressText.textContent = `${Math.floor(loaded)}%`; // Update progress text

    // Calculate the width to set for the loader element
    const loaderWidth = (loaded / 100) * 300; // 300px is the desired width
    loader.style.width = `${loaderWidth}px`; // Set the width of the loader

    if (loaded >= 100) {
      clearInterval(interval); // Stop the interval when content loading reaches 100%
      setTimeout(() => {
        tl.to(".preloader h1, .loader, .progress", {
          y: -100,
          scale: 1.5,
          opacity: 0,
          stagger: 0.1,
        }).to(".preloader", {
          top: "-110%",
          duration: 1,
          ease: Power2,
        });
      }, 1000); // Hide after 1 second (adjust as needed)
    }
  }, delay / 100); // Adjust the interval time based on the content loading delay
});

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
  };

  elem.onmouseleave = () => {
    imgDiv.style.opacity = 0;
  };
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
    duration: 0.5,
  });
};
