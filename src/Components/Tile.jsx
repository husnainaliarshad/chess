import { Move } from './Utils.js'
export default function Tile({ boardState, setBoardState, x, y, checked, setChecked }) { 
    function handleClick() {
        let cx = checked[0], cy = checked[1];
    
        if (cx < 0|| cy < 0) {//if board unchecked
            if (boardState[x][y] !== '-') {
                setChecked([x, y]);
            }
        }
        else if (cx === x && cy === y) { //if this one was previously checked
            setChecked([-1, -1]); //then uncheck this one
        }
        else {Move(boardState, setBoardState, x, y, checked, setChecked);}
    }
    return (<>
        <button onClick = {() => {handleClick()}} >{boardState[x][y]}</button>
    </>);
}