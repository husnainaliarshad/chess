export default function Tile ({boardState, setBoardState, x, y, checked, setChecked}) {
    function handleClick() {
        let cx = checked[0], cy = checked[1];
        if (cx === -1 || cy === -1) {//if unchecked
            if (boardState[x][y] == 'p') {
                setChecked([x,y]); 
            }
        }
        else if (cx === x && cy === y) { //if this one checked
            setChecked([-1,-1]); //then uncheck
        }  
        else if (boardState[x][y] != 'p') { // if this tiile doesn't have a piece on it.
            let tempState = boardState; //then move
            tempState[checked[0]][checked[1]] = "-";
            tempState[x][y] = "p";
            setBoardState (tempState);
            setChecked([-1,-1]); //then uncheck
        }
        else {
            setChecked([-1,-1]);
        }
        
    }
    
    return (<>
        <button onClick ={()=>handleClick()}>{boardState[x][y]}</button>
    </>);
}