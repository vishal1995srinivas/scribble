import styled from 'styled-components';

const Post = styled.div`
	background: white;

	border: 1px solid ${(props) => props.theme.offWhite};
	box-shadow: ${(props) => props.theme.bs};
	position: relative;
	display: flex;
	flex-direction: column;
	border-color: transparent; /* outer border of the border making transparent. */
	img {
		width: 100%;
		height: 50rem;
		object-fit: cover;
	}
	p {
		width: 50rem;
		height: 5rem;
		line-height: 2;
		font-weight: 300;
		flex-grow: 1;
		padding: 0 3rem;
		font-size: 1.5rem;
		word-wrap: break-word;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.buttonList {
		display: grid;
		width: 100%;
		border-top: 1px solid ${(props) => props.theme.lightgrey};
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		grid-gap: 1px;
		background: ${(props) => props.theme.lightgrey};
		& > * {
			background: white;
			height: 5rem;
			border: 0;
			font-size: 1rem;
			padding: 1rem;
		}
	}
`;

export default Post;
