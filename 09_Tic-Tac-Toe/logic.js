function createUser(name, symbol){
    let score = 0;

    const incrementScore = () => { score++; };
    const getScore = () => score;
    function resetScore(){
        score = 0;
    }

    return { name,symbol,getScore,incrementScore, resetScore};
}

function game(name1, name2){
    let symbol = ['X','O'];
    let filled = 9;
    const player1 = createUser(name1, symbol[0]);
    const player2 = createUser(name2, symbol[1]);
    let isValid = true;

    let status = { type: "continue", player: null }; 
    
    let currentPlayer = player1;
    
    let gameBoard = [
        ['','',''],
        ['','',''],
        ['','','']
    ];

    const getStatus = () => status;
    const getCurrentPlayer = () => currentPlayer;
    const makeMove = (x,y) => {
        if (gameBoard[x][y] !== ''){
            isValid = false;
            return;
        } 
        isValid = true;
        gameBoard[x][y] = currentPlayer.symbol;
        filled--;
        console.log(gameBoard);


        if (checkScore(x, y)) {
            status = { type: "win", player: currentPlayer };
            handleRoundWin();
            return;
        };

        if (filled === 0){
            status = { type: "tie", player: null };
            console.log("It's a Tie!");
            return;
        };

    };
    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;


    const handleRoundWin = () => {
        currentPlayer.incrementScore();
        console.log(`${currentPlayer.name} won this round`);
    }

    const getValidMove = () => {
        return isValid;
    }

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        console.log(`It's ${currentPlayer.name}'s turn. Symbol: (${currentPlayer.symbol})`);
    }

    const checkScore = (x,y) => {
        const row = gameBoard[x].every(cell => cell === currentPlayer.symbol);
        const col = gameBoard.every(row => row[y] === currentPlayer.symbol);
        const diag = x === y && gameBoard.every((row, i) => row[i] === currentPlayer.symbol);
        const anti = x + y === 2 && gameBoard.every((row, i) => row[2 - i] === currentPlayer.symbol);

        return row || col || diag || anti;
    }

    const resetRound = () =>{
        gameBoard = [
            ['','',''],
            ['','',''],
            ['','','']
        ];
        currentPlayer = player1;
        filled = 9;
        status = { type: "continue", player: null };
    }

    const resetGame = () => {
        resetRound();
        player1.resetScore();
        player2.resetScore();
    }

    return {getStatus, getPlayer1,getPlayer2,getCurrentPlayer, makeMove,getValidMove, resetRound, resetGame, switchPlayer};
}

const displayController = (function(){
    let currentGame = null;
    let roundEnd = false;

    const container = document.querySelector('.container');
    const player1_name = document.querySelector('#player1');
    const player2_name = document.querySelector('#player2');
    const player1_score = document.querySelector('.player1Score');
    const player2_score = document.querySelector('.player2Score'); 
    const gameBoard = document.querySelector('.game-board');
    const divide = document.querySelector('.divide');

    const startBtn = document.querySelector('#reset-button');
    const nextBtn = document.querySelector('#next-round');


    const p1_name_display = document.querySelector('.p1-name');
    const p2_name_display = document.querySelector('.p2-name');
    let message = document.querySelector('.message');
    
    const createGameBoard = () => {
        gameBoard.innerHTML = "";

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            const row = Math.floor(i / 3);
            const col = i % 3;

            cell.dataset.row = row;
            cell.dataset.col = col;

            cell.addEventListener("click", handleCellClick);

            gameBoard.appendChild(cell);
        }
    };

    const handleCellClick = (e) => {
        if (roundEnd){
            return;
        }
        const row = Number(e.target.dataset.row);
        const col = Number(e.target.dataset.col);
        
        currentGame.makeMove(row, col);
        if (!currentGame.getValidMove()){
            console.log("Invalid");
            return;
        }
        updateSymbol(e.target);    

        const result = currentGame.getStatus();

        if (result.type === 'win'){
            message.textContent = `${result.player.name} wins this round!`;
            updateScore();
            roundEnd = true;
            return;
        }

        if (result.type === 'tie'){
            message.textContent = "It's a tie"
            roundEnd = true;
            return;
        }                  
        currentGame.switchPlayer();
        updateMessage();

                
    };

    const updateScore = () =>{
        player1_score.textContent = currentGame.getPlayer1().getScore();
        divide.textContent = ":";
        player2_score.textContent = currentGame.getPlayer2().getScore();
    }

    const updateSymbol = (cell) => {
        cell.textContent = currentGame.getCurrentPlayer().symbol; 
    };

    const updateMessage= () => {
        message.textContent = `It's ${currentGame.getCurrentPlayer().name}'s turn`;
    }

    const startGame = () => {
        container.classList.add("started");
        const name1 = player1_name.value || "Player 1";
        const name2 = player2_name.value || "Player 2";

        p1_name_display.textContent = name1;
        p2_name_display.textContent = name2;
        currentGame = game(name1, name2); 
        roundEnd =  false;
        updateMessage();
        createGameBoard();
        updateScore();
        startBtn.textContent = "Reset"
        
    }

    const newRound = () => {
        roundEnd = false;
        createGameBoard();
        currentGame.resetRound();
        updateMessage();
    }

    nextBtn.addEventListener("click", newRound);
    startBtn.addEventListener("click", startGame);

})();
