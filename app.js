import html2canvas from "html2canvas";
import "./app.sass";

html2canvas(document.querySelector("#capture")).then(function(canvas) {
  let width = canvas.width;
  let height = canvas.height;
  let ctx = canvas.getContext("2d");
  let idatum = ctx.getImageData(0, 0, width, height);
  let data = [];

  // Creating 36 separated canvases
  for (let i = 0; i < 36; i++) {
    data.push(ctx.createImageData(width, height));
  }

  // Filling Canvases with data
  for (let f = 0; f < width; f++) {
    for (let k = 0; k < height; k++) {
      for (let l = 0; l < 2; l++) {
        let n = 4 * (k * width + f);
        let m = Math.floor((36 * (Math.random() + (2 * f) / width)) / 3);

        for (let p = 0; p < 4; p++) {
          data[m].data[n + p] = idatum.data[n + p];
        }
      }
    }
  }

  data.forEach((imagedata, index) => {
    let cloned = canvas.cloneNode();

    cloned.style.transition = `all 1.5s ease-out ${index / 36}s`;

    cloned.getContext("2d").putImageData(imagedata, 0, 0);

    document.body.appendChild(cloned);

    const snapAfterFade = () => {
      setTimeout(() => {
        // Calculating angles to animate
        let angle = (Math.random() - 0.5) * 2 * Math.PI;
        let cosAngle = 60 * Math.cos(angle);
        let sinAngle = 60 * Math.sin(angle);
        let rotateAngle = 15 * (Math.random() - 0.5);

        cloned.style.transform = `rotate(${rotateAngle}deg) translate(${cosAngle}px) translate(${sinAngle}px)`;
        cloned.style.opacity = 0;
      });
    };

    let snapSelector = document.querySelector(".snap");

    snapSelector.addEventListener("click", e => {
      setTimeout(() => {
        snapSelector.classList.add("show");
        setTimeout(() => {
          snapSelector.classList.remove("show");
        }, 1500);
      });
      snapAfterFade();
    });
  });
});
