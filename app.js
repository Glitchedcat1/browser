let tabs = [];
let activeTab = null;

// Open the browser
function openBrowser() {
    const launcher = document.getElementById("launcher-screen");
    const browserContainer = document.getElementById("browser-container");

    launcher.style.display = "none";
    browserContainer.style.display = "flex";

    // Open the first tab
    addNewTab();
}

// Change background before browser opens
function changeBackground() {
    const fileInput = document.getElementById("bg-upload");
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.body.style.backgroundImage = `url('${e.target.result}')`;
        };
        reader.readAsDataURL(file);
    }
}

// Add a new tab
function addNewTab() {
    const defaultUrl = "https://ambient-steel.vercel.app/";
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
