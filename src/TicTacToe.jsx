import { useState } from 'react'
import Button from '@mui/material/Button';

export function TicTacToe() {
    const [board, setBoard] = useState([null, null, null, null, null, null, null, null, null])

    const [isXTurn, setIsXTurn] = useState(true)
    const boardClick = (index) => {
        console.log(index)
        if (!winner && board[index] == null) {
            const boardCopy = [...board];
            boardCopy[index] = isXTurn ? "X" : "O"
            setBoard(boardCopy)
            setIsXTurn(!isXTurn)
        }
    }
    const decidewinner = (board) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (board[a] != null && board[a] == board[b] && board[b] == board[c]) {
                console.log('Winner', board[a])
                return board[a]
            }
        }
        return null
    }

    const winner = decidewinner(board)

    const[res,setRes]=useState(board)
    const resetFunc = () => { console.log("reset")
    setBoard([null, null, null, null, null, null, null, null, null])
    setIsXTurn(true)
        // for(let i=0;i<board.length;i++){
        //     board[i]=null
        //     console.log(board[i])
        //     setRes(board[i])
            
        // }
    }
    return (

        <div className="tic-tac-toe">
            {/* {winner ? (<Confetti width={width} height={height} gravity={0.02} />) : null} */}
            <h1>Tic Tac To</h1>
            <div className="board">
                {board.map((val, index) => (<GameBox val={val} onPlayerClick={() => boardClick(index)} />))}
            </div>
            <h1>The winner is :{winner}</h1>
            <Button onClick={resetFunc}>Reset</Button>
        </div>
    );

}

function GameBox({ val, onPlayerClick }) {
    // const [val, setVal] = useState("")
    const styles = {
        color: val == "X" ? "green" : "red"
    }

    return (
        <div style={styles} onClick={onPlayerClick} className="game-box">{val}</div>)
}

// function Reset({ resetFunc }) {

//     return (
//         <div>
            
//         </div>
//     )
// }