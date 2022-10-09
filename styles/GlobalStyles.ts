import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
   
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: auto;

    font-family: 'Montserrat', sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    padding: 0;
  }
  button,
  input,
  select {
    font-family: inherit;
    appearance: none;
    outline: none;
  }
  a,
  button,
  svg {
    cursor: pointer;
  }
  img {
    -webkit-user-drag: none;
  }
  ul,
  ol {
    margin: 0;
    padding:0;
    list-style: none;
    
  }
  * {
    box-sizing: border-box;
  }
  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`
