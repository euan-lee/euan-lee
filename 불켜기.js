let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
let [N,M]=input[0].trim().split(' ').map(Number)
input.shift();
const dx=[0,0,1,-1] 
const dy=[1,-1,0,0]
board=input.map(x=>x.trim().split(' ').map(x=>(Number(x)-1)))
let Tree=Array.from({length: N},() => Array.from(Array(N),(x) =>[]))
let visited=Array.from({length: N},() => Array.from({length: N},(x) =>(x=false)))
let light=Array.from({length: N},() => Array.from(Array(N),(x) =>false))

const AreaCheck=(x,y)=>{
    if(x>=0&&y>=0&&x<N&&y<N){
        return true;
    }else{
        return false;
    }
  }
  
let answer=0;
for(let i=0;i<M;i++){
    Tree[board[0][0]][board[0][1]].push([board[0][2],board[0][3]])
    board.shift();
}

class Node{
    constructor(x,y) {
        this.x = x;
        this.y =y;
    }
  }

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    push(x,y) {
        let node = new Node(x,y);
        if (this.size === 0) {
          this.head = node;
        }else{
          this.tail.next = node;
        }
        this.tail = node;
        this.size++;
      }
      shift(){
        let temp = this.head;
        if (this.size === 0) {
          this.head = null;
          this.tail = null;
        } else {
          this.head = this.head.next;
        }
        this.size--;
        return temp;
      }
      length() {
        return this.size;
      }
} 

const Bfs=(i,j)=>{
    let queue=new Queue;
    queue.push(i,j)
    light[i][j]=true
    visited[i][j]=true
    while(queue.length()!==0){
        let cur = queue.shift()
        let x=cur.x
        let y=cur.y
        for(i=0;i<Tree[x][y].length;i++){//불켜기
            if(light[Tree[x][y][i][0]][Tree[x][y][i][1]]===false){
                light[Tree[x][y][i][0]][Tree[x][y][i][1]]=true
                for(k=0;k<4;k++){
                  let x_t=Tree[x][y][i][0]+dx[k]
                  let y_t=Tree[x][y][i][1]+dy[k]
                  if(AreaCheck(x_t,y_t)&&visited[x_t][y_t]===true){ 
                    visited[Tree[x][y][i][0]][Tree[x][y][i][1]]=true;
                    queue.push(Tree[x][y][i][0],Tree[x][y][i][1])
                  }
              }
            }
        }
   
        for(i=0;i<4;i++){
            let x_n=x+dx[i]
            let y_n=y+dy[i]
            if(AreaCheck(x_n,y_n)&&visited[x_n][y_n]===false&&light[x_n][y_n]===true){//
              visited[x_n][y_n]=true;
              queue.push(x_n,y_n)
            }
          }
    }
}



Bfs(0,0)
for(let i=0;i<N;i++){
  for(let j=0;j<M;j++){
    if(light[i][j]===true){
      answer++;
    }
  }
}
console.log(answer)
