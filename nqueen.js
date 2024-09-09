let count = 0;
let n;
const board = new Array(15);

const promising = (cdx) => {
    for (let i = 0; i < cdx; i++) {
        if (board[cdx] === board[i] || cdx - i === Math.abs(board[cdx] - board[i])) {
            return false;
        }
    }
    return true;
};

const nqueen = (cdx) => {
    if (cdx === n) {
        count++;
        return;
    }

    for (let i = 0; i < n; i++) {
        board[cdx] = i; // cdx번째 행, i번째 열에 퀸을 놓아본다.
        if (promising(cdx)) { // 유망성 판단
            nqueen(cdx + 1); // 다음 행에 대해 퀸을 놓아본다.
        }
    }
};

// 입력 처리
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
n = parseInt(input);

nqueen(0);
console.log(count);
