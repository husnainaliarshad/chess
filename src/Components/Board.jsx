import '../App.css'

import { useState } from 'react';
import Tile from './Tile.jsx'
export default function Board() {
    let board = [
  ['br','bn','bb','bk','bq','bb','bn','br'],
  ['bp','bp','bp','bp','bp','bp','bp','bp'],
  ['-','-','-','-','-','-','-','-'],
  ['-','-','-','-','-','-','-','-'],
  ['-','-','-','-','-','-','-','-'],
  ['-','-','-','-','-','-','-','-'],
  ['wp','wp','wp','wp','wp','wp','wp','wp'],
  ['wr','wn','wb','wk','wq','wb','wn','wr']
];
    const [boardState, setBoardState] = useState(board);
    const [checked, setChecked] = useState([-2,-1]);
    const [turn, setTurn] = useState(-1);

    return ( <div className = "justify-center items-center flex flex-col-reverse">
        <table>
            <tbody>
                {boardState.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((element, colIndex) => (
                            <td key={colIndex}>
                                <Tile 
                                    boardState = {boardState}
                                    setBoardState = {setBoardState}
                                    checked = {checked}
                                    setChecked = {setChecked}
                                    x = {rowIndex}
                                    y = {colIndex}
                                    turn = {turn}
                                    setTurn = {setTurn}
                                /> 
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        
        <p>Checked: ({checked[0]}, {checked[1]})</p>
        <p>Turn : {turn}</p>
        
        </div>
    );
}