const fs = require("fs");

const leftTextElement = document.getElementById("left-text");
const rightTextElement = document.getElementById("right-text");
const fileInput = document.getElementById("file-input");

const referenceFilePath = "reference.txt"; // Store your reference text file here

// Load reference file
fs.readFile(referenceFilePath, "utf8", (err, data) => {
    if (!err) {
        leftTextElement.textContent = data;
    }
});

// Handle file upload
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const uploadedText = e.target.result;
        compareFiles(leftTextElement.textContent, uploadedText);
    };
    reader.readAsText(file);
});

// Compare files and highlight missing parts
function compareFiles(referenceText, uploadedText) {
    const referenceLines = referenceText.split("\n");
    const uploadedLines = uploadedText.split("\n");

    let highlightedText = uploadedLines
        .map((line) => (referenceLines.includes(line) ? line : `<span class="highlight">${line}</span>`))
        .join("\n");

    rightTextElement.innerHTML = highlightedText.replace(/\n/g, "<br>");
}
