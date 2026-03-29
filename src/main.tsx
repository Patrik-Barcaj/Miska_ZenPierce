// Import createRoot from react-dom/client to render the React tree
import { createRoot } from "react-dom/client";
// Import the main App component from the app directory
import App from "./app/App.tsx";
// Import the main global stylesheet with TailwindCSS directives
import "./styles/index.css";

// Find the HTML element with id 'root' and assert it is not null
// Then call createRoot with this element and render the main App component inside it
createRoot(document.getElementById("root")!).render(<App />);