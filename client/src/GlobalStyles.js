import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

html, body{
  height: 100%;
}

  html {
  font-size: 62.5%;
}

body {
  margin: 0;
  padding: 0;
  background-color: white;
  font-family: "Helvetica Neue", Helvetica;
}

`;

export default GlobalStyle;
