// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

let textInput = document.getElementById("text");
let colorsSelect = document.getElementById("colors");
let fontsSelect = document.getElementById("fonts");
let circle = document.getElementById("circle");
let imgDiv = document.getElementsByClassName("img")[0];
let imgDiv1 = document.getElementsByClassName("img1")[0];
let lengthLeft = document.getElementById("length-left");

const printFontwithText = (text) => {
    let newText = text ? text : "Costum Text";
    for(let i = 0; i < fontsSelect.childNodes.length - 1; i++ ){
        fontsSelect[i].innerText = newText;
    }
}
const checkLengthText = (textNew) => {
    if (textInput.value.length >= 0 && textInput.value.length < 4) {
        textNew.style.fontSize = "9vw";
        textNew.setAttributeNS(null, "y", "60%");
    }
    if (textInput.value.length >= 4 && textInput.value.length < 8) {
        textNew.setAttributeNS(null, "y", "59%");
        textNew.style.fontSize = "8.5vw";
    }
    if (textInput.value.length >= 8 && textInput.value.length < 12) {
        textNew.setAttributeNS(null, "y", "59%");
        textNew.style.fontSize = "6.5vw";
    }
    if (textInput.value.length >= 12 && textInput.value.length < 16) {
        textNew.setAttributeNS(null, "y", "58%");
        textNew.style.fontSize = "6vw";
    }
    if (textInput.value.length >= 16 && textInput.value.length < 20) {
        textNew.setAttributeNS(null, "y", "57%");
        textNew.style.fontSize = "5.5vw";
    }
    if (textInput.value.length >= 20) {
        textNew.setAttributeNS(null, "y", "56%");
        textNew.style.fontSize = "5vw";
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
    
    newText.style.fontFamily = font ? font : "";
    newText.style.letterSpacing = "-0.2vw";
    checkLengthText(newText);
    newText.style.textAlign = "middle";
    newText.style.fontWeight = "600";
    newText.style.transform = "scaleY(1.3)";
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
    lengthLeft.innerText = 24 - target.value.length;
    createCanvas(textInput.value, colorsSelect.value, fontsSelect.value);
    printFontwithText(target.value);
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
