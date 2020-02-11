import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'

class SquareCell extends Component {
	render() {
		let activeClass = this.props.active ? 'active' : '';
		let classNames = `square-cell ${activeClass}`;

		return (
			<div className={classNames}>&nbsp;</div>
		);
	}
}

class SquareRow extends Component {
	render() {
		let {row, cols, pos} = this.props;
		let {x, y} = pos;
		let cells = [];

		for (let col=0; col<cols; col++) {
			let active = (row === y && col === x);

			cells.push(
				<SquareCell key={'col' + col} active={active} />
			);
		}

		return (
			<div className="square-row">
				{cells}
			</div>
		);
	}
}

class Square extends Component {
	render() {
		let {x, y, width, height} = this.props;
		let rows = [];

		for (let row=0; row<height; row++) {
			rows.push(
				<SquareRow key={'row' + row} row={row} cols={width} pos={{x, y}} />
			);
		}

		return (
			<div className="square">
				{rows}
			</div>
		);
	}
}

function propsFromState(state) {
	return _.pick(state.square, 'width', 'height', 'x', 'y');
}

export default connect(propsFromState)(Square);
