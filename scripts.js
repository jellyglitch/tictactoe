const gameboard = (function (){
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    function markCell (player, row, column) {
        let position = board[row][column];
        let defaultMark = false;

        if(position.getValue() == 0){
            position.markCell(player);
            defaultMark = true;
            return defaultMark;
        } else {
            console.log("Already marked, choose a new position.");
            defaultMark = false;
            return defaultMark;
        }
    }

    return { getBoard, markCell }
})();

function Cell(){
    let value = 0;

    const markCell = (player) => {
        value = player;
    }

    const getValue = () => value;

    return { markCell, getValue };
}

const game = (function (playerOne = "Player One", playerTwo = "Player Two"){
    let win = false;

    const players = [
        { name: playerOne, symbol: "X" },
        { name: playerTwo, symbol: "O" }
    ];

    let activePlayer = players[0].symbol;

    const playRound = (row, column) => {
        let marked = gameboard.markCell(activePlayer, row, column);
        //check for win 
        if(checkRows() || checkColumns() || checkDiagonals()){
            console.log(activePlayer + " wins!");
        } else if (marked){
            switchPlayer();
        }
    }

    function checkRows(){
        for(let i = 0; i < 3; i++){
            if(gameboard.getBoard()[i][0].getValue() == gameboard.getBoard()[i][1].getValue() 
                && gameboard.getBoard()[i][1].getValue() == gameboard.getBoard()[i][2].getValue() 
                && (gameboard.getBoard()[i][0].getValue() !== 0)){
                win = true;
            } 
        }

        return win;
    }

    function checkColumns(){
        for(let i = 0; i < 3; i++){
            if(gameboard.getBoard()[0][i].getValue() == gameboard.getBoard()[1][i].getValue() 
                && gameboard.getBoard()[1][i].getValue() == gameboard.getBoard()[2][i].getValue() 
                && (gameboard.getBoard()[0][i].getValue() !== 0)){
                win = true;
            } 
        }

        return win;
    }

    function checkDiagonals(){
        if(((gameboard.getBoard()[0][0].getValue() == gameboard.getBoard()[1][1].getValue() 
            && gameboard.getBoard()[1][1].getValue() == gameboard.getBoard()[2][2].getValue())
            || (gameboard.getBoard()[2][0].getValue() == gameboard.getBoard()[1][1].getValue() 
            && gameboard.getBoard()[1][1].getValue() == gameboard.getBoard()[0][2].getValue()))
            && gameboard.getBoard()[1][1].getValue() !== 0){
            win = true;
        } 
        
        return win;
    }

    function switchPlayer(){
        activePlayer == "X" ? (activePlayer = players[1].symbol) : (activePlayer = players[0].symbol);
    }

    function printBoard(){
        gameboard.getBoard().forEach(row => {
            console.log(row.map(cell => cell.getValue()));
        });
    }

    return { playRound, printBoard };
})();


game.playRound(0, 2); // X marks
game.playRound(0, 1); // O marks
game.playRound(1, 1); // X marks
game.playRound(2, 2); // O marks
game.playRound(2, 0); // X marks
game.printBoard();