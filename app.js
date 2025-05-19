let tabs = [];
let activeTab = null;

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

// Navigate to a URL
function navigate() {
    const urlInput = document.getElementById("url-input").value;
    if (urlInput) {
        const url = urlInput.includes("http") ? urlInput : `https://${urlInput}`;
        openTab(url);
    }
}

// Add a new tab
function addNewTab() {
    const defaultUrl = "https://www.google.com";
    openTab(defaultUrl);
}

// Open or switch to a tab
function openTab(url) {
    const iframe = document.getElementById("browser-frame");
    const tabsContainer = document.getElementById("tabs");

    // Create a new tab object
    const tab = {
        id: Date.now(),
        url: url,
    };
    tabs.push(tab);
    activeTab = tab.id;

    // Update iframe
    iframe.src = url;

    // Update the UI
    renderTabs();
}

// Close a tab
function closeTab(tabId) {
    tabs = tabs.filter(tab => tab.id !== tabId);

    // If the closed tab was active, switch to another
    if (activeTab === tabId) {
        if (tabs.length > 0) {
            activeTab = tabs[tabs.length - 1].id;
            document.getElementById("browser-frame").src = tabs[tabs.length - 1].url;
        } else {
            activeTab = null;
            document.getElementById("browser-frame").src = "";
        }
    }

    renderTabs();
}

// Render tabs in the UI
function renderTabs() {
    const tabsContainer = document.getElementById("tabs");
    tabsContainer.innerHTML = "";

    tabs.forEach(tab => {
        const tabElement = document.createElement("div");
        tabElement.className = "tab";
        if (tab.id === activeTab) tabElement.classList.add("active");

        tabElement.innerHTML = `
            ${new URL(tab.url).hostname}
            <button class="close-btn" onclick="closeTab(${tab.id})">✖</button>
        `;
        tabElement.onclick = () => {
            activeTab = tab.id;
            document.getElementById("browser-frame").src = tab.url;
            renderTabs();
        };

        tabsContainer.appendChild(tabElement);
    });
}

// Run on page load
showLoadingScreen();
addNewTab();
