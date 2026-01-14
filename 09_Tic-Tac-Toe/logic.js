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
    
    let currentPlayer = player1;
    
    let gameBoard = [
        ['','',''],
        ['','',''],
        ['','','']
    ];

    const makeMove = (x,y) => {
        if (gameBoard[x][y] !== '') return;

        gameBoard[x][y] = currentPlayer.symbol;
        filled--;
        console.log(gameBoard);

        if (checkScore(x, y)) {
            handleRoundWin();
            return;
        };

        if (filled == 0){
            console.log("It's a Tie!");
            resetRound();
        };

        switchPlayer();
    };
           

    const handleRoundWin = () => {
        currentPlayer.incrementScore();
        console.log(`${currentPlayer.name} won this round`);
        resetRound();
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
    }

    const resetGame = () => {
        resetRound();
        player1.resetScore();
        player2.resetScore();
    }

    return { makeMove,resetRound, resetGame};
}