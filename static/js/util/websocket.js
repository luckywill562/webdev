export default (ws)=>{
    ws.onmessage = (e) => {
        console.log(e.data);
    }
}