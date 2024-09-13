const dx=[1,-1,0,0] 
const dy=[0,0,1,-1]
let answer=0;
let input=require("fs").readFileSync('/dev/stdin').toString().trim().split('\n')
const [M,N] = input.shift().split(' ');
const distance =Array.from(Array(Number(N)), () => Array(Number(M)).fill(Infinity))
const visited =Array.from(Array(Number(N)), () => Array(Number(M)).fill(false))
let queue = []

const AreaCheck=(x,y)=>{
    if(x>=0&&x<N&&y>=0&&y<M){
        return true;
    }else{
        return false;
    }
}

const BFS=()=>{
    distance[0][0]=0
    queue.push([0,0,0])
    while(queue.length!==0){
        let x=queue[0][0]
        let y=queue[0][1]
        let dist=queue[0][2]
        visited[x][y]=true
        queue.shift();
        /*
        if(x===N-1&&y===M-1){
            break;
        }
        */
        for(let i=0;i<4;i++){
            let x_n=x+dx[i]
            let y_n=y+dy[i]     
            if(AreaCheck(x_n,y_n)===true){
                if(Number(input[x_n][y_n])===Number(1)){
                    if(Number(distance[x][y])+Number(input[x_n][y_n])<Number(distance[x_n][y_n])){
                        distance[x_n][y_n]=Number(distance[x][y])+Number(input[x_n][y_n])
                        queue.push([x_n,y_n,distance[x_n][y_n]])
                    }
                }else{
                    if(distance[x_n][y_n]>distance[x][y]){
                        distance[x_n][y_n]=distance[x][y]
                        queue.push([x_n,y_n,distance[x_n][y_n]])
                    }       
                }
            }
            }
    }
}
BFS();
console.log(distance[N-1][M-1])
//console.log(distance)
