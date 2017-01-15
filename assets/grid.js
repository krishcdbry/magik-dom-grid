/**
 * @desc
 * A Closure with all private properties & methods. Everything in the HTML document is built with pure JS to achieve complete abstraction.
 */
(function (window, document) {
	var rows = 10;
	var cols = 10;

	/**
	 * @name createButton
	 * @typicalname createButton
	 * @param {Node} footer  - footer node
	 * @param {string} text  - text to be displayed on button
	 * @param {function} fun  - function name
	 * @param {number|null} gridConfig - for row*col specification
	 * @desc - To create a button element and appends to footer
	 * @usage
	 * createButton(tagname)
	 */
	function createButton(footer, text, fun, gridConfig) {
		var btn = document.createElement('a');
		btn.innerHTML = text;
		btn.href = 'javascript:;';
		btn.className = 'btn';
		btn.addEventListener("click", function() {
			if (!gridConfig) {
				fun();
			}
			else {
				fun(gridConfig);
			}
		});
		footer.appendChild(btn);
	}


	/**
	 * @name resetBoard
	 * @typicalname resetBoard
	 * @desc To reset the currently saved board to initial state
	 * @usage
	 * resetBoard()
	 */
	function resetBoard() {
		var arr = document.getElementsByClassName('block');
		for (var item in arr) {
			if (arr[item].style) {
				arr[item].style.backgroundColor = '#fff';
				arr[item].style.color = '#000';
			}
		}
		;
		localStorage.clear();
	}

	/**
	 * @name saveState
	 * @typicalname saveState
	 * @desc - To save the state of the board into localstorage
	 * @usage
	 * saveState()
	 */
	function saveState() {
		var board = {
			'rows': rows,
			'cols': cols
		};
		var blocks = [];
		var arr = document.getElementsByClassName('block');
		for (var item = 0; item < arr.length; item++) {
			if (arr[item]) {
				var blockObj = {};
				blockObj['id'] = arr[item].id;
				blockObj['color'] = arr[item].style.backgroundColor;
				blocks.push(blockObj);
			}
		}
		board['blocks'] = blocks;
		localStorage.setItem('my-board', JSON.stringify(board));
		alert("Board state saved successfully !");
	};

	/**
	 * @name getRandomColor
	 * @typicalname getRandomColor
	 * @desc - Getting random HTML Color code
	 * @return {string} color
	 * @usage
	 * getRandomColor()
	 */
	function getRandomColor() {
		var x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
		var color = '#';
		for (var i = 0; i < 6; i++) {
			var rand = Math.floor(Math.random(0, 15) * 10);
			color += x[rand];
		}
		return color;
	}

	/**
	 * @name createBlocks
	 * @typicalname createBlocks
	 * @param {number} row  - number of rows
	 * @param {number} col  - number of cols
	 * @param {object|null} blocks  - Blocks object with saved color codes
	 * @desc - To create the board according to the data
	 * @usage
	 * createBlocks(5, 5, {});
	 */
	function createBlocks(row, col, blocks) {
		rows = row;
		cols = col;
		var len = (blocks) ? blocks.length : rows * cols;

		var frag = document.createDocumentFragment();
		var board = document.createElement('div');
		board.className = 'board';
		board.style.width = 75 * cols + "px";

		for (var i = 0; i < len; i++) {
			var block = document.createElement('div');
			block.className = 'block';
			block.innerHTML = i;
			block.id = i;

			if (blocks && blocks[i].color) {
				block.style.backgroundColor = blocks[i].color;
				block.style.color = '#fff';
				if (blocks[i].color == 'rgb(255, 255, 255)') {
					block.style.color = '#000';
				}
			}

			block.addEventListener("click", function() {
				this.style.backgroundColor = getRandomColor();
				this.style.color = '#fff';
			});

			board.appendChild(block);
		}

		frag.appendChild(board);
		var mainContent = document.getElementById('main-content');
		mainContent.appendChild(frag);

	}


	/**
	 * @name setGrid
	 * @typicalname setGrid
	 * @param {number} num config  - Creating a grid according to the given measurment
	 * @desc - To create a button element and appends to footer
	 * @usage
	 * createButton(tagname)
	 */
	function setGrid (num) {
		document.getElementById('main-content').innerHTML = '';
		localStorage.clear();
		createBlocks(num, num);
	}


	if (localStorage.getItem('my-board')) {
		var board = JSON.parse(localStorage.getItem('my-board'));
		createBlocks(board.rows, board.cols, board.blocks);
	}
	else {
		createBlocks(rows, cols);
	}

	var footer = document.getElementById('footer');
	var gridConf = document.getElementById('grid-config');

	createButton(footer, 'Reset', resetBoard);
	createButton(footer, 'Save state', saveState);
	createButton(footer, 'Refresh page', window.location.reload);


	createButton(gridConf, '5 X 5', setGrid , 5);
	createButton(gridConf, '10 x 10', setGrid, 10);
	createButton(gridConf, '15 x 15', setGrid , 15);
	createButton(gridConf, '25 x 25', setGrid, 25);

	return {};

})(window, document);
