import React, {Component} from 'react'
import {PacmanLoader} from 'react-spinners'
import {connect} from 'react-redux'
import _ from 'lodash'

class WaitPanel extends Component {
	render() {
		const {isMoving} = this.props;

		return (
			<div className='wait-panel'>
				<PacmanLoader color="silver" loading={isMoving} />
			</div>
		);
	}
}

function propsFromState(state) {
	return _.pick(state.square, 'isMoving');
}

export default connect(propsFromState)(WaitPanel);
