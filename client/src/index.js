import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';
import { hydrate, render } from "react-dom";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  console.log("Hydrated render");
  hydrate(<App />, rootElement);
} else {
  console.log("Normal render")
  render(<App />, rootElement);
}



// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );




