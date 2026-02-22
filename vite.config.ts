import { defineConfig } from 'vite' // Importing defineConfig helper from the vite library
import path from 'path' // Importing the Node.js path module for handling file and directory paths
import tailwindcss from '@tailwindcss/vite' // Importing the Tailwind CSS plugin for Vite
import react from '@vitejs/plugin-react' // Importing the React plugin for Vite
//
export default defineConfig({ // Defining and exporting the Vite configuration object
  plugins: [ // Starting the list of plugins to be used by Vite
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(), // Initializing the React plugin
    tailwindcss(), // Initializing the Tailwind CSS plugin
  ], // Closing the plugins array
  resolve: { // Configuration for resolving module imports
    alias: { // Defining path aliases to simplify imports
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'), // Resolving '@' to the absolute path of the './src' directory
    }, // Closing the alias object
  }, // Closing the resolve object
//
  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'], // Specifying asset patterns to be treated as static assets
}) // Closing the defineConfig function call
//
