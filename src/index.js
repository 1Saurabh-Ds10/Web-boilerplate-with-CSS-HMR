import "./css/reset.css";
import big from "./img/15.jpg";

const test = () => {
  const pre = document.createElement("pre");
  const code = document.createElement("code");
  code.innerText = "Hello World";

  pre.appendChild(code);

  document.body.appendChild(pre);
  const img = document.createElement("img");
  img.src = big;

  document.body.appendChild(img);
 
};

test();
