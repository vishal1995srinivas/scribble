import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
const CREATE_POST_MUTATION = gql`
	mutation CREATE_POST_MUTATION($title: String!, $description: String!, $image: String, $largeImage: String) {
		createPost(title: $title, description: $description, image: $image, largeImage: $largeImage) {
			id
		}
	}
`;
//ToDo: Disable submit button (OR (Show progress bar)) until image and largeimage url arrive from cloudinary. User clicking submit immediately after uploading images might be a problem here.
class CreatePost extends Component {
	state = {
		title: '',
		description: '',
		image: '',
		largeImage: ''
	};
	handleChange = (e) => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val });
	};
	uploadFile = async (e) => {
		//console.log('Uploading File');
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'sickfits');
		const res = await fetch('https://api.cloudinary.com/v1_1/dugfprmwz/image/upload', {
			method: 'POST',
			body: data
		});
		//add catch to find errors and shoot
		const file = await res.json();
		//console.log(file);
		this.setState({
			image: file.secure_url,
			largeImage: file.eager[0].secure_url
		});
	};
	render() {
		return (
			<Mutation mutation={CREATE_POST_MUTATION} variables={this.state}>
				{(createPost, { loading, error }) => (
					<Form
						data-test="form"
						onSubmit={async (e) => {
							// Stop the form from submitting
							e.preventDefault();
							// call the mutation
							const res = await createPost();
							// change them to the single item page
							console.log(res);
							//Similar to link tag
							Router.push({
								pathname: '/post',
								query: { id: res.data.createPost.id }
							});
						}}
					>
						<Error error={error} />
						<fieldset disabled={loading} aria-busy={loading}>
							<label htmlFor="file">
								Image
								<input
									type="file"
									id="file"
									name="file"
									placeholder="Upload an Image"
									required
									onChange={this.uploadFile}
								/>
							</label>
							<label htmlFor="title">
								Title
								<input
									type="text"
									id="title"
									name="title"
									placeholder="Title"
									required
									value={this.state.title}
									onChange={this.handleChange}
								/>
							</label>

							<label htmlFor="description">
								Description
								<textarea
									id="description"
									name="description"
									placeholder="Enter A Description"
									required
									value={this.state.description}
									onChange={this.handleChange}
								/>
							</label>
							<button type="submit">Submit</button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}
export default CreatePost;
export { CREATE_POST_MUTATION };
