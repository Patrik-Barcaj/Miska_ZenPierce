import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

// Basic life sign
const lifeSign = document.createElement("div");
lifeSign.style.cssText = "position:fixed;top:0;left:0;width:100%;background:red;color:white;z-index:100000;text-align:center;padding:5px;font-weight:bold;";
lifeSign.textContent = "DEBUG: main.tsx is executing";
document.documentElement.appendChild(lifeSign);

// DOM Logging for debugging
const logContainer = document.createElement("div");
logContainer.style.position = "fixed";
logContainer.style.bottom = "0";
logContainer.style.left = "0";
logContainer.style.width = "100%";
logContainer.style.maxHeight = "200px";
logContainer.style.overflowY = "auto";
logContainer.style.backgroundColor = "rgba(0,0,0,0.8)";
logContainer.style.color = "#0f0";
logContainer.style.fontSize = "12px";
logContainer.style.zIndex = "99999";
logContainer.style.padding = "10px";
logContainer.id = "debug-log";
document.body.appendChild(logContainer);

function log(msg: any) {
  const line = document.createElement("div");
  const text = typeof msg === 'object' ? JSON.stringify(msg, Object.getOwnPropertyNames(msg)) : String(msg);
  line.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
  const container = document.getElementById("debug-log");
  if (container) {
    container.appendChild(line);
    container.scrollTop = container.scrollHeight;
  }
  console.log(msg);
}

(window as any).log = log;

window.onerror = (msg, url, lineNo, columnNo, error) => {
  log(`Global Error: ${msg} at ${lineNo}:${columnNo}`);
  if (error) {
    log(`Stack: ${error.stack}`);
  }
  return false;
};

window.addEventListener('unhandledrejection', (event) => {
  log(`Unhandled Promise Rejection: ${event.reason}`);
  if (event.reason && event.reason.stack) {
    log(`Stack: ${event.reason.stack}`);
  }
});

log("Starting app initialization...");
try {
  log("Environment Check: " + JSON.stringify({
    location: window.location.href,
    userAgent: navigator.userAgent
  }));

  log("Attempting to find root element...");
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    log("CRITICAL ERROR: Root element '#root' not found in DOM!");
  } else {
    log("Root element found. Initializing React Root...");
    const root = createRoot(rootElement);
    log("React Root initialized. Rendering <App />...");
    root.render(<App />);
    log("Render command issued.");
  }
} catch (e) {
  log("FATAL CONTEXT CRASH during mount:");
  log(e);
}
