import DIRECTIONS from './directions';

async function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const square = {
	state: {
		width: 10,
		height: 10,
		x: 0,
		y: 0,
		isMoving: false
	},
	reducers: {
		changeSize(state, width, height) {
			return {...state, width, height};
		},
		startMove(state) {
			return {...state, isMoving: true};
		},
		moveLeft(state) {
			return {...state, x: state.x - 1};
		},
		moveUp(state) {
			return {...state, y: state.y - 1};
		},
		moveRight(state) {
			return {...state, x: state.x + 1};
		},
		moveDown(state) {
			return {...state, y: state.y + 1};
		},
		moveTo(state, x, y) {
			return {...state, x, y};
		},
		endMove(state) {
			return {...state, isMoving: false};
		}
	},
	effects: dispatch => ({
		resize(width, rootState, height) {
			let {x, y} = rootState.square;
			let targetWidth = Math.max(width, 1);
			let targetHeight = Math.max(height, 1);
			dispatch.square.changeSize(targetWidth, targetHeight);

			if (x < targetWidth && y < targetHeight)
				return;

			dispatch.square.moveTo(
				Math.min(x, width-1),
				Math.min(y, height-1)
			);
		},
		async delayThenMove(ms, rootState, direction) {
			dispatch.square.startMove();
			await delay(ms);

			switch (direction) {
				case DIRECTIONS.UP:
					dispatch.square.moveUp();
					break;
				case DIRECTIONS.RIGHT:
					dispatch.square.moveRight();
					break;
				case DIRECTIONS.DOWN:
					dispatch.square.moveDown();
					break;
				case DIRECTIONS.LEFT:
					dispatch.square.moveLeft();
					break;
				default:
					break;
			}

			dispatch.square.endMove();
		}
	})
};
