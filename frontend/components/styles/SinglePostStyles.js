import styled from 'styled-components';
const SinglePostStyles = styled.div`
	max-width: 1200px;
	margin: 2rem auto;
	box-shadow: ${(props) => props.theme.bs};
	display: grid;
	grid-auto-rows: 1fr;
	grid-auto-flow: rows;
	min-height: 200px;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover; /*  try this with cover and contain */
	}
	.details {
		margin: 3rem;
		font-size: 2rem;
	}
	.likes {
		margin-left: 3rem;
	}
	p {
		display: flex;
		justify-content: center;
	}
	h2 {
		text-decoration-line: underline;
	}
`;
export { SinglePostStyles };
