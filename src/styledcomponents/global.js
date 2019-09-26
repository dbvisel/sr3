import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`



:root {
	--black: #333;
	--borderColor: #ccc;
	--white: #ffffff;
	--orange: rgb(242, 148, 43);
	--gray: #666;
	--textFont: "Merriweather", "et-bembo", "Padauk", serif;
	--headerFont: "Source Sans Pro", "Padauk", "Avenir", "Helvetica Neue", "Helvetica", sans-serif;
}

html,
body {
	font-family: var(--textFont);
}

h1,
h2,
h3,
h4,
nav {
	font-family: var(--headerFont);
}`;
