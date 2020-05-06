import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import PleaseSignIn from './PleaseSignIn';
import User from './User';
import Link from 'next/link';
import TotalLikes from './TotalLikes';
const CREATE_LIKE = gql`
	mutation CREATE_LIKE($post: ID!) {
		createLikes(post: $post) {
			id
		}
	}
`;
const TOTAL_LIKES_QUERY = gql`
	query TOTAL_LIKES_QUERY {
		likesesConnection {
			aggregate {
				count
			}
		}
	}
`;

const CHECK_LIKES_QUERY = gql`
	query CHECK_LIKES_QUERY($post: ID!) {
		likeses(where: { post: { id: $post } }) {
			id
		}
	}
`;
//ToDo: Disable submit button (OR (Show progress bar)) until image and largeimage url arrive from cloudinary. User clicking submit immediately after uploading images might be a problem here.
class CreateLikes extends Component {
	state = {
		buttonClicked: false
	};
	render() {
		return (
			<User>
				{({ data: { me } }) => (
					<Query query={CHECK_LIKES_QUERY} variables={{ post: this.props.postId }}>
						{({ error, loading, data }) => {
							return (
								<Mutation
									mutation={CREATE_LIKE}
									variables={{ post: this.props.postId }}
									refetchQueries={[ { query: TOTAL_LIKES_QUERY }, { query: CHECK_LIKES_QUERY } ]}
								>
									{(createLikes, { loading, error }) => (
										<Form
											data-test="form"
											onSubmit={async (e) => {
												// Stop the form from submitting
												e.preventDefault();
												// call the mutation
												const res = await createLikes();
												// change them to the single post page
												console.log(res);
												this.setState({ buttonClicked: true });
											}}
										>
											<Error error={error} />
											{data.likeses.length > 0 ? (
												<div>
													<TotalLikes />
													<div align="right">
														<button type="submit" disabled>
															🏁 You have Liked !
														</button>
													</div>
												</div>
											) : (
												<div>
													{me && (
														<div>
															{this.state.buttonClicked ? (
																<div>
																	<TotalLikes />
																	<div align="right">
																		<button type="submit" disabled>
																			🏁 You have Liked !
																		</button>
																	</div>
																</div>
															) : (
																<div>
																	<TotalLikes />
																	<div align="right">
																		<button type="submit">
																			👍 Lik{loading ? 'ing' : 'e'}
																		</button>
																	</div>
																</div>
															)}
														</div>
													)}
												</div>
											)}
											{!me && (
												<Link href="/signup">
													<a>👍 Like</a>
												</Link>
											)}
										</Form>
									)}
								</Mutation>
							);
						}}
					</Query>
				)}
			</User>
		);
	}
}
export default CreateLikes;
export { CREATE_LIKE };
