function mover(boardState, setBoardState, x, y, checked, setChecked) {
    let cx = checked[0], cy = checked[1];
    let tempState = boardState;
    let piece = tempState[cx][cy];
    tempState[cx][cy] = '-';
    tempState[x][y] = piece;
    setBoardState(tempState);
    setChecked([-1, -1]);
}
export function color(piece) {
    if (piece[0] === 'w') 
        return -1;
    else if (piece[0] === 'b') 
        return 1;
    else
        return 0;
}

function validMove(boardState, x, y, c, cx, cy) {
    if (x === cx && y === cy) return null;
    if (x>7 || y > 7 || x < 0 || y < 0) return null;
    if (boardState[x][y] === '-' ) return [x,y];
    else if (color(boardState[x][y]) != c) return [x,y]
}
function getPawnMoveSet(boardState, checked, c) {
    let cx = checked[0], cy = checked[1];
    let moveSet = [];

    //pawn starting positions
    let starting = 1; //black
    if (c == -1) starting = 6;

    if (boardState[cx + c][cy] === '-') {
        moveSet.push([cx + c, cy])
        if (boardState[cx + c + c][cy] === '-' && cx == starting)
            moveSet.push([cx + c + c, cy])
    }

    if (cx + c >= 0 && cx + c < 8 && cy - 1 >= 0)
        if (boardState[cx + c][cy - 1] != '-' && color(boardState[cx + c][cy - 1]) != c)
            moveSet.push([cx + c, cy - 1])

    if (cx + c >= 0 && cx + c < 8 && cy + 1 < 8)
        if (boardState[cx + c][cy + 1] != '-' && color(boardState[cx + c][cy + 1]) != c)
            moveSet.push([cx + c, cy + 1])
    return moveSet;
}
function getKingMoveSet(boardState, checked, c) {
    let moveSet = [];
    let cy = checked[0];
    let cx = checked[1];

    for (let x = cx - 1; x <= cx + 1; x++) {
        for (let y = cy - 1; y <= cy + 1; y++) {

            // Don't include the king's current square
            if (x === cx && y === cy)
                continue;

            // Outside 8x8 board
            if (x < 0 || x >= 8 || y < 0 || y >= 8)
                continue;

            // Empty square or enemy piece
            if (boardState[y][x] === '-' || color(boardState[y][x]) !== c)
                moveSet.push([y, x]);
        }
    }
    return moveSet;
}

function getKnightMoveSet(boardState, checked, c) { 
    let cx = checked[0], cy = checked[1];
    let set = [[cx+2,cy+1], [cx+2, cy-1], [cx-2,cy+1], [cx-2,cy-1], 
               [cx+1,cy+2], [cx-1, cy+2], [cx+1,cy-2], [cx-1,cy-2]]  ;
    let moveSet = [];
    for (let i of set) {
        moveSet.push(validMove(boardState, i[0], i[1], c, cx,cy));
    }
    console.log(moveSet);
    return moveSet;
}
function go (boardState, checked,c, direction) {
    // direction is a vector
    // [0,1] is right, [0,-1] is left
    // [1, 0] is down, [-1,0] is up
    // [1,1]/[-1,-1] is the y = -x looking diagonal
    // [-1,1]/[1,-1] is the y =  x looking diagonal
    let moveSet = [];
    let cx = checked[0], cy = checked[1];
    let dx = direction[0], dy = direction[1];
    
    for (let start = [cx,cy]; start[0] < 8 && start[1] < 8 && start[0] >= 0 && start[1] >= 0; start = [start[0]+dx, start[1]+dy]) {
        moveSet.push(validMove(boardState, start[0], start[1], c, cx, cy));
        if (JSON.stringify(start) !== JSON.stringify([cx,cy]) && color(boardState[start[0]][start[1]]) !== 0) break;
    }
    return moveSet;
}
function getQueenMoveSet(boardState, checked, c) {
    let moveSet = [];
    let cx = checked[0], cy = checked[1];

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            let a = go(boardState, checked, c, [i,j]);
            moveSet.push(...a);            
        }
    }
    return moveSet;
}
function getBishopMoveSet(boardState, checked, c) { 
    let moveSet = [];
    let cx = checked[0], cy = checked[1];
    moveSet.push(...go(boardState,checked, c, [-1, -1]))
    moveSet.push(...go(boardState,checked, c, [1, -1]))
    moveSet.push(...go(boardState,checked, c, [-1, 1]))
    moveSet.push(...go(boardState,checked, c, [1, 1]))
    return moveSet;
 }
function getRookMoveSet(boardState, checked, c) {
   let moveSet = [];
    let cx = checked[0], cy = checked[1];
    moveSet.push(...go(boardState,checked, c, [-1, 0]))
    moveSet.push(...go(boardState,checked, c, [1, 0]))
    moveSet.push(...go(boardState,checked, c, [0, 1]))
    moveSet.push(...go(boardState,checked, c, [0, -1]))
    return moveSet;
}

export function Move(boardState, setBoardState, x, y, checked, setChecked) {
    let cx = checked[0], cy = checked[1];
    let piece = boardState[cx][cy][1];
    let moveSet = [];
    if (piece === 'p')
        moveSet = getPawnMoveSet(boardState, checked, color(boardState[cx][cy]));
    else if (piece === 'n')
        moveSet = getKnightMoveSet(boardState, checked, color(boardState[cx][cy]));
    else if (piece === 'r')
        moveSet = getRookMoveSet(boardState, checked, color(boardState[cx][cy]));
    else if (piece === 'b')
        moveSet = getBishopMoveSet(boardState, checked, color(boardState[cx][cy]));
    else if (piece === 'q')
        moveSet = getQueenMoveSet(boardState, checked, color(boardState[cx][cy]));
    else if (piece === 'k')
        moveSet = getKingMoveSet(boardState, checked, color(boardState[cx][cy]));

    for (let thismove of moveSet) {
        if (thismove && thismove[0] === x && thismove[1] === y) {
            mover(boardState, setBoardState, x, y, checked, setChecked);
            break;
        }
    }

    setChecked([-1, -1]);
}  