import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';

const SingleItemStyles = styled.div`
	max-width: 1200px;
	margin: 2rem auto;
	box-shadow: ${(props) => props.theme.bs};
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	min-height: 800px;
	img {
		width: 100%;
		height: 100%;
		object-fit: contain; /*  try this with cover and contain */
	}
	.details {
		margin: 3rem;
		font-size: 2rem;
	}
`;
class SinglePost extends Component {
	render() {
		return <div>single post</div>;
	}
}
export default SinglePost;
export { SINGLE_POST_QUERY };
