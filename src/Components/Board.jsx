import { useState } from 'react';
import Tile from './Tile.jsx'
export default function Board() {
    let board = [
  ['p','p','p','p','p','p','p','p'],
  ['p','p','p','p','p','p','p','p'],
  ['-','-','-','-','-','-','-','-'],
  ['-','-','-','-','-','-','-','-'],
  ['-','-','-','-','-','-','-','-'],
  ['-','-','-','-','-','-','-','-'],
  ['p','p','p','p','p','p','p','p'],
  ['p','p','p','p','p','p','p','p']
];
    const [boardState, setBoardState] = useState(board);
    const [checked, setChecked] = useState([-1,-1]);

    return ( <>
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
                                /> 
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        <p>Checked: ({checked[0]}, {checked[1]})</p>
        </>
    );
}