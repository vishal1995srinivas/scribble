import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import PleaseSignIn from './PleaseSignIn';
import User from './User';
import Link from 'next/link';

//ToDo: Disable submit button (OR (Show progress bar)) until image and largeimage url arrive from cloudinary. User clicking submit immediately after uploading images might be a problem here.
class CreateLikes extends Component {
	state = {
		buttonClicked: false
	};
	render() {
		return (
			<Mutation
				mutation={CREATE_LIKE}
				variables={{ item: this.props.itemId }}
				refetchQueries={[ { query: TOTAL_LIKES_QUERY } ]}
			>
				{(createLikes, { loading, error }) => (
					<Form
						data-test="form"
						onSubmit={async (e) => {
							// Stop the form from submitting
							e.preventDefault();
							// call the mutation
							const res = await createLikes();
							// change them to the single item page
							console.log(res);
							this.setState({ buttonClicked: true });
						}}
					>
						<Error error={error} />
						{me && (
							<div>
								{this.state.buttonClicked ? (
									<button type="submit" disabled>
										Liked !
									</button>
								) : (
									<button type="submit">Lik{loading ? 'ing' : 'e'}</button>
								)}
							</div>
						)}
						{!me && (
							<Link href="/signup">
								<a>Like</a>
							</Link>
						)}
					</Form>
				)}
			</Mutation>
		);
	}
}
export default CreateLikes;
export { CREATE_LIKE };
