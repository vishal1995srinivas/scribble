import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

class Signin extends Component {
	state = {
		password: '',
		email: ''
	};
	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		return (
			<Form
				method="post"
				onSubmit={async (e) => {
					e.preventDefault();

					this.setState({ email: '', password: '' });
				}}
			>
				<fieldset disabled={loading} aria-busy={loading}>
					<h2>Sign In for An Account</h2>
					<Error error={error} />
					<label htmlFor="email">
						Email
						<input
							type="email"
							name="email"
							placeholder="email"
							value={this.state.email}
							onChange={this.saveToState}
						/>
					</label>

					<label htmlFor="password">
						Password
						<input
							type="password"
							name="password"
							placeholder="password"
							value={this.state.password}
							onChange={this.saveToState}
						/>
					</label>
					<button type="submit">Sign In</button>
				</fieldset>
			</Form>
		);
	}
}
export default Signin;
export { SIGNIN_MUTATION };
