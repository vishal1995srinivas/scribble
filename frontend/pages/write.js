import Link from 'next/link';
import CreateItem from '../components/CreateItem';
import PleaseSignIn from '../components/PleaseSignIn';
function Write() {
	return (
		<div>
			<PleaseSignIn>
				<CreateItem />
			</PleaseSignIn>
		</div>
	);
}

export default Write;
