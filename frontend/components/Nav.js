import Link from 'next/link';
import { Mutation } from 'react-apollo';
 import User from './User';
 import Signout from './SignOut';
import NavStyles from './styles/NavStyles';

const Nav = () => (
	<User>

		{({ data: { me } }) => (
			<NavStyles data-test="nav">
				<Link href="/Posts">
					<a>Posts</a>
				</Link>
				{me && (
					<>
						<Link href="/write">
							<a>Write</a>
						</Link>
						<Signout />
					</>
				 )} 
				 {!me && ( 
					<Link href="/signup">
						<a>SignIn</a>
					</Link>
				 )} 
			</NavStyles>
		)}
	</User>
);
export default Nav;
