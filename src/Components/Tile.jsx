import '../App.css'

import { Move , color } from './Utils.js'
export default function Tile({ boardState, setBoardState, x, y, checked, setChecked, turn, setTurn}) { 
    function handleClick() {
        let cx = checked[0], cy = checked[1];
    
        if (cx < 0|| cy < 0) {//if board unchecked
            if (boardState[x][y] !== '-') {
                if (color(boardState[x][y]) === turn)
                setChecked([x, y]);
            }
        }

        else if (cx === x && cy === y) { //if this one was previously checked
            if (color(boardState[x][y]) === turn)
            setChecked([-1, -1]); //then uncheck this one
        }
        else {
            Move(boardState, setBoardState, x, y, checked, setChecked);
            setTurn(turn * -1)
        }
    }
    let fileName = boardState[x][y];
    if (fileName != '-')
        fileName = fileName[0]  + fileName[1].toUpperCase();
    return (<>
        <button className={`${(x+y+1)%2 ? "bg-white": "bg-gray-500"} text-blue-700 w-16 h-16 flex justify-center items-center`} onClick = {() => {handleClick()}} >
           { boardState[x][y] !=='-'? <img className = "w-15 h-15 " src={`/pieces/${fileName}.svg`} alt={boardState[x][y]} />: ""}
        </button>
    </>);
}