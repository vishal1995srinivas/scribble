import React from 'react';
import PaginationStyles from './styles/PaginationStyles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { perPage } from '../config';
import Head from 'next/head';
import Link from 'next/link';
const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		postsConnection {
			aggregate {
				count
			}
		}
	}
`;
const Pagination = (props) => (
	<Query query={PAGINATION_QUERY}>
		{({ data, loading, error }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error</p>;

			const count = data.postsConnection.aggregate.count;
			const pages = Math.ceil(count / perPage);
			return (
				<PaginationStyles data-test="pagination">
					<Head>
						<title>
							Scribble -- {props.page} of {pages}
						</title>
					</Head>
					<Link
						prefetch
						href={{
							pathname: 'Posts',
							query: { page: props.page - 1 }
						}}
					>
						<a className="prev" aria-disabled={props.page <= 1}>
							⬅ Prev
						</a>
					</Link>
					<p>
						Page {props.page} of <span className="totalPages"> {pages}</span>
					</p>
					<p>{count} Posts Total</p>
					<Link
						prefetch
						href={{
							pathname: 'Posts',
							query: { page: props.page + 1 }
						}}
					>
						<a className="next" aria-disabled={props.page >= pages}>
							Next ➡
						</a>
					</Link>
				</PaginationStyles>
			);
		}}
	</Query>
);

export default Pagination;
export { PAGINATION_QUERY };
