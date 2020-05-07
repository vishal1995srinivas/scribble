import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import User from './User';
import Link from 'next/link';
import TotalLikes, { TOTAL_LIKES_QUERY } from './TotalLikes';
//Refactor this component ... Try adding pleasesignin..
const CREATE_LIKE = gql`
	mutation CREATE_LIKE($post: ID!) {
		createLikes(post: $post) {
			id
		}
	}
`;
// const TOTAL_LIKES_QUERY = gql`
// 	query TOTAL_LIKES_QUERY($post: ID!) {
// 		likesesConnection(where: { post: { id: $post } }) {
// 			aggregate {
// 				count
// 			}
// 		}
// 	}
// `;
//Check likes query : checks whether the user has liked this post or not.
const CHECK_LIKES_QUERY = gql`
	query CHECK_LIKES_QUERY($post: ID!) {
		likeses(where: { post: { id: $post } }) {
			id
		}
	}
`;
class CreateLikes extends Component {
	state = {
		buttonClicked: false
	};
	render() {
		let postId = this.props.postId;
		return (
			<User>
				{({ data: { me } }) => (
					<Query query={CHECK_LIKES_QUERY} variables={{ post: this.props.postId }}>
						{({ error, loading, data }) => {
							return (
								<div>
									<Error error={error} />
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

													console.log(res);
													this.setState({ buttonClicked: true });
												}}
											>
												{data.length > 0 ? (
													<div>
														<TotalLikes postId={postId} />
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
																		<TotalLikes postId={postId} />
																		<div align="right">
																			<button type="submit" disabled>
																				🏁 You have Liked !
																			</button>
																		</div>
																	</div>
																) : (
																	<div>
																		<TotalLikes postId={postId} />
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
													<div>
														<TotalLikes postId={postId} />
														<Link href="/signup">
															<button type="text">🔒 SignIn To 👍 like</button>
														</Link>
													</div>
												)}
											</Form>
										)}
									</Mutation>
								</div>
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
