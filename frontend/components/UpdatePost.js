import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';

import Error from './ErrorMessage';

const SINGLE_POST_QUERY = gql`
	query SINGLE_POST_QUERY($id: ID!) {
		post(where: { id: $id }) {
			id
			title
			description
		}
	}
`;
const UPDATE_POST_MUTATION = gql`
	mutation UPDATE_POST_MUTATION($id: ID!, $title: String, $description: String) {
		updatePost(id: $id, title: $title, description: $description) {
			id
			title
			description
		}
	}
`;
class UpdatePost extends Component {
	state = {};
	handleChange = (e) => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val });
	};
	updatePost = async (e, updatePostMutation) => {
		e.preventDefault();
		console.log('Updating Post!!');
		console.log(this.state);
		const res = await updatePostMutation({
			variables: {
				id: this.props.id,
				...this.state
			}
		});
		console.log('Updated!!');
	};
	render() {
		return (
			<Query
				query={SINGLE_POST_QUERY}
				variables={{
					id: this.props.id
				}}
			>
				{({ data, loading }) => {
					if (loading) return <p>Loading...</p>;
					if (!data.post) return <p>No Post Found for ID {this.props.id}</p>;
					return (
						<Mutation mutation={UPDATE_POST_MUTATION} variables={this.state}>
							{(updatePost, { loading, error }) => (
								<Form onSubmit={(e) => this.updatePost(e, updatePost)}>
									<Error error={error} />
									<fieldset disabled={loading} aria-busy={loading}>
										<label htmlFor="title">
											Title
											<input
												type="text"
												id="title"
												name="title"
												placeholder="Title"
												required
												defaultValue={data.post.title}
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
												defaultValue={data.post.description}
												onChange={this.handleChange}
											/>
										</label>
										<button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
									</fieldset>
								</Form>
							)}
						</Mutation>
					);
				}}
			</Query>
		);
	}
}
export default UpdatePost;
export { UPDATE_POST_MUTATION };
