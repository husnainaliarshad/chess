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
    return (<>
        <button className={`${(x+y+1)%2 ? "bg-white": "bg-black"} text-blue-700 w-20 h-20`} onClick = {() => {handleClick()}} >{boardState[x][y]} <p className = "text-red-400 text-xs">{x},{y}</p></button>
    </>);
}