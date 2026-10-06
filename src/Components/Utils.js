function mover(boardState, setBoardState, x, y, checked, setChecked) {
    let cx = checked[0], cy = checked[1];
    let tempState = boardState;
    let piece = tempState[cx][cy];
    tempState[cx][cy] = '-';
    tempState[x][y] = piece;
    setBoardState(tempState);
    setChecked([-1, -1]);
}

function color(piece) {
    if (piece[0] == 'w') return -1;
    else return 1;
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

function getKnightMoveSet(boardState, checked, color) { console.log("knight") }
function getQueenMoveSet(boardState, checked, color) { console.log("queen") }
function getBishopMoveSet(boardState, checked, color) { console.log("bishop") }
function getRookMoveSet(boardState, checked, c) {
    let moveSet = [];
    let cx = checked[0], cy = checked[1];

    // Right
    for (let x = cx + 1; x < 8; x++) {
        if (boardState[x][cy] === '-') {
            moveSet.push([x, cy]);
        } else {
            if (color(boardState[x][cy]) !== c)
                moveSet.push([x, cy]);
            break;
        }
    }

    // Left
    for (let x = cx - 1; x >= 0; x--) {
        if (boardState[x][cy] === '-') {
            moveSet.push([x, cy]);
        } else {
            if (color(boardState[x][cy]) !== c)
                moveSet.push([x, cy]);
            break;
        }
    }

    // Up
    for (let y = cy + 1; y < 8; y++) {
        if (boardState[cx][y] === '-') {
            moveSet.push([cx, y]);
        } else {
            if (color(boardState[cx][y]) !== c)
                moveSet.push([cx, y]);
            break;
        }
    }

    // Down
    for (let y = cy - 1; y >= 0; y--) {
        if (boardState[cx][y] === '-') {
            moveSet.push([cx, y]);
        } else {
            if (color(boardState[cx][y]) !== c)
                moveSet.push([cx, y]);
            break;
        }
    }

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
        if (thismove[0] === x && thismove[1] === y) {
            mover(boardState, setBoardState, x, y, checked, setChecked);
            break;
        }
    }

    setChecked([-1, -1]);
}  