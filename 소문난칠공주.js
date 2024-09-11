
const filePath = process.platform === "linux" ? "/dev/stdin" : "./Javascript/input.txt";
const students = require("fs").readFileSync(filePath).toString().trim().split("\n");
const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];
const combination = [];
let answer = 0;

// 7명의 여학생 조합이 만들어졌다면 BFS로 이 여학생들이 전부 인접해있는지 확인한다.
function bfs(combination) {
    // 모든 위치를 방문처리 해준다. (true로 초기화)
    const visited = Array.from({ length: 5 }, () => Array(5).fill(true));
    // 조합에 속해있는 여학생의 위치는 방문 처리를 해제 해준다.
    for (const [y, x] of combination) {
        visited[y][x] = false;
    }
    // BFS 시작
    const queue = [combination[0]];
    visited[combination[0][0]][combination[0][1]] = true;
    let visitCount = 1;
    let front = 0;
    while (queue.length > front) {
        let [y, x] = queue[front++];
        for (let i = 0; i < 4; i++) {
            let ny = y + dy[i];
            let nx = x + dx[i];
            // 범위를 벗어나지 않고 방문한 적 없는 위치일 경우
            if (ny >= 0 && nx >= 0 && ny < 5 && nx < 5 && !visited[ny][nx]) {
                visited[ny][nx] = true;
                visitCount++;
                queue.push([ny, nx]);
            }
        }
    }
    // 7명 모두 인접해있을 경우 true 반환
    return visitCount === 7;
}

// 우선 인접한지 여부 상관없이 7명이 모일수 있는 조합을 전부 구한다. (임도연파가 4명 이상 속해있는 경우는 빼고)
function dfs(cur, countY) {
    // 임도연파가 4명 이상일 경우
    if (countY >= 4) return;
    // 7명이 모였을 경우
    if (combination.length === 7) {
        if (bfs(combination)) answer++;
        return;
    }
    for (let i = cur; i < 25; i++) {
        let y = Math.floor(i / 5); // 행
        let x = i % 5; // 열
        // 현재 학생의 위치 추가
        combination.push([y, x]);
        // 재귀 호출
        dfs(i + 1, countY + (students[y][x] === "Y" ? 1 : 0));
        // 재귀 탈출하면 배열의 마지막 요소 제거(pop)
        combination.pop();
    }
}

dfs(0, 0);
console.log(answer);
