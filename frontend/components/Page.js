import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Header from './Header';
import Meta from './Meta';
const theme = {
	red: '#021060',
	black: '#393939',
	grey: '#3A3A3A',
	lightgrey: '#E1E1E1',
	offwhite: '#EDEDED',
	maxWidth: '1000px',
	bs: '0 12px 24px 0 rgba(0,1,0,.09)' //box-shadow
};
const StyledPage = styled.div`
	background-color: white;
	color: ${(props) => props.theme.black};
`;
const Inner = styled.div`
	max-width: ${(props) => props.theme.maxWidth};
	padding: 2rem;
	margin: 0 auto;
	/* background-color: ${(props) => props.theme.red}; */
`;
injectGlobal`
@font-face {
	font-family: 'radnika_next';
	src: url('/static/radnikanext-medium-webfont.woff2')
	format('woff2');
	font-style:normal;
	font-weight:normal;
}
html{
box-sizing: border-box;
font-size: 10px;
}
*,*:before,*:after{
	box-sizing:inherit;
}
body{
	padding:0;
	margin: 0;
	font-size:1.5rem;
	line-height: 2;
	font-family: 'radnika_next';
}
a{
	text-decoration:none;
	color: ${theme.black};
}
`;
class Page extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<StyledPage>
					<Meta />
					<Header />
					<Inner>{this.props.children}</Inner>
				</StyledPage>
			</ThemeProvider>
		);
	}
}
export default Page;
