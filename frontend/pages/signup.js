import SignUp from '../components/SignUp';

import styled from 'styled-components';
import Signin from '../components/Signin';

const Columns = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 20px;
`;
const SignUpPage = (props) => (
	<Columns>
		<SignUp />
		<Signin />
	</Columns>
);
export default SignUpPage;
