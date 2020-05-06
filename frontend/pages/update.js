import UpdatePost from '../components/UpdatePost';

const UpdatePage = ({ query }) => (
	<div>
		<UpdatePost id={query.id} />
	</div>
);

export default UpdatePage;
