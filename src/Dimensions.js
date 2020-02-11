import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash';

function safeParseInt(str) {
	let val = parseInt(str, 10) || 0;
	return Math.max(val, 1);
}

class Dimensions extends Component {
	constructor(props) {
		super(props);
		this.state = _.pick(this.props, 'height', 'width');

		this.onChange = _.debounce(
			() => this.correctAndResize(),
			500
		);
	}

	correctAndResize() {
		let width = safeParseInt(this.state.width);
		let height = safeParseInt(this.state.height);
		this.setState({width, height});
		this.props.resize(width, height);
	}

	onChangeX(e) {
		this.setState({width: e.target.value});
		this.onChange();
	}

	onChangeY(e) {
		this.setState({height: e.target.value});
		this.onChange();
	}

	onBlur() {
		this.onChange.cancel();
		this.correctAndResize();
	}

	render() {
		const {width, height} = this.state;

		return (
			<form className='dimensions'>
				<label>Dimensions:</label>
				<input type='number' min='1' value={width} onChange={e => this.onChangeX(e)} onBlur={() => this.onBlur()}/>
				<span>&nbsp;&times;&nbsp;</span>
				<input type='number' min='1' value={height} onChange={e => this.onChangeY(e)} onBlur={() => this.onBlur()}/>
			</form>
		);
	}
}

function propsFromState(state) {
	return _.pick(state.square, 'width', 'height');
}

function dispatchesFromState(state) {
	return _.pick(state.square, 'resize');
}

export default connect(propsFromState, dispatchesFromState)(Dimensions);
