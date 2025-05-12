// Simulate loading screen
function showLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    const progressBar = document.getElementById("progress-bar");

    let width = 0;
    const interval = setInterval(() => {
        width += 10;
        progressBar.style.width = width + "%";
        
        if (width >= 100) {
            clearInterval(interval);
            loadingScreen.style.display = "none";
        }
    }, 200);
}

function navigate() {
    const urlInput = document.getElementById("url-input").value;
    const iframe = document.getElementById("browser-frame");

    if (urlInput) {
        showLoadingScreen();
        iframe.src = urlInput.includes("http") ? urlInput : `https://${urlInput}`;
    }
}

// Change background
function changeBackground() {
    const fileInput = document.getElementById("bg-upload");
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.body.style.backgroundImage = `url('${e.target.result}')`;
            document.body.style.backgroundSize = 'cover';
        };
        reader.readAsDataURL(file);
    }
}

// Run on page load
showLoadingScreen();
