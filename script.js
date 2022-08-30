// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

let textInput = document.getElementById("text");
let colorsSelect = document.getElementById("colors");
let fontsSelect = document.getElementById("fonts");
let circle = document.getElementById("circle");
let imgDiv = document.getElementsByClassName("img")[0];
let imgDiv1 = document.getElementsByClassName("img1")[0];
let lengthLeft = document.getElementById("length-left");

const checkLengthText = (textNew) => {
    if (textInput.value.length >= 0 && textInput.value.length < 10) {
        textNew.fontSize = "10vw";

    }
    if (textInput.value.length >= 10 && textInput.value.length < 15) {
        textNew.fontSize = "9vw";
    }
    if (textInput.value.length >= 15) {
        textNew.fontSize = "7vw";
    }
}
document.addEventListener("resize", () => createCanvas(textInput.value, colorsSelect.value, fontsSelect.value))
const createCanvas = (text, color = "black", font, stroke = false) => {
    document.querySelector("g").innerHTML = "";

    const path = document.getElementsByTagName('path')[0];
    let svgG = document.querySelector("g");
    const svgNS = "http://www.w3.org/2000/svg";
    const newText = document.createElementNS(svgNS, "text");


    newText.setAttributeNS(null, "x", -2);
    newText.setAttributeNS(null, "y", "80%");
    newText.style.fontFamily = font ? font : "";
    newText.style.letterSpacing = "-0.6vw";
    checkLengthText(newText.style);
    newText.style.textAlign = "middle";
    newText.style.fontWeight = "600";
    newText.style.fill = stroke ? "white" : color;
    path.style.fill = stroke ? "white" : color;
    const textNode = document.createTextNode(text ? text : "Costum Text");
    if (color === "#e7e7e7" || color === "#E6E9EE" || color === "#c9dd60") {
        imgDiv1.style.backgroundColor = "#0202024d";
    } else {
        imgDiv1.style.backgroundColor = "#02020200";
    }
    newText.appendChild(textNode);
    svgG.appendChild(newText);
}

createCanvas()

textInput.onkeyup = ({ target }) => {
    lengthLeft.innerText = target.value.length;
    createCanvas(textInput.value, colorsSelect.value, fontsSelect.value)
};

colorsSelect.onchange = ({ target }) => {
    circle.style.backgroundColor = colorsSelect.value;
    createCanvas(textInput.value, colorsSelect.value, fontsSelect.value)
}

fontsSelect.onchange = ({ target }) => {
    createCanvas(textInput.value, colorsSelect.value, fontsSelect.value)
}


const download = () => {
    var data = document.querySelector(".img1");
    data.style.backgroundColor = "";
    var svgString = new XMLSerializer().serializeToString(data);
    var decoded = unescape(encodeURIComponent(svgString));
    var base64 = btoa(decoded);
    var imgSource = `data:image/svg+xml;base64,${base64}`;
    var a = document.createElement("a"); //Create <a>
    a.href = imgSource; //Image Base64 Goes here
    a.download = "Image.svg"; //File name Here
    a.click();
}
