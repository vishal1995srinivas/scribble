import React, { Component } from 'react';
import DownShift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
// import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

class AutoComplete extends Component {
	render() {
		return <div>Search</div>;
	}
}
export default AutoComplete;
