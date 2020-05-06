import Link from 'next/link';

import PleaseSignIn from '../components/PleaseSignIn';
import CreatePost from '../components/CreatePost';
function Write() {
	return (
		<div>
			<PleaseSignIn>
				<CreatePost />
			</PleaseSignIn>
		</div>
	);
}

export default Write;
