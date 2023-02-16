/**
* @function connect
* This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
*/
import Cookie from 'js-cookie'
const data = {
    c_user: parseInt(Cookie.get('s_id')),
    security_token: Cookie.get('isLogedin')
};
const ws_link = 'ws://localhost:8081?token=' + JSON.stringify(data);
var timeout = 250; // Initial timeout duration as a class variable

export default function Connect(setWs, state) {
    var ws = new WebSocket(ws_link);
    ws.binaryType = "arraybuffer";
    let that = this; // cache the this
    var connectInterval;
    setWs(ws);
    // websocket onopen event listener
    ws.onopen = (e) => {
        timeout = 250; // reset timer to 250 on open of websocket connection 
        clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    // websocket onclose event listener
    ws.onclose = e => {
        console.log(
            `Socket is closed. Reconnect will be attempted in ${Math.min(
                10000 / 1000,
                (timeout + timeout) / 1000
            )} second.`,
            e.reason
        );

        timeout = timeout + timeout; //increment retry interval
        connectInterval = setTimeout(check(setWs, state), Math.min(10000, timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    ws.onerror = err => {
        console.error(
            "Socket encountered error: ",
            err.message,
            "Closing socket"
        );

        ws.close();
    };
    return ws
};

/**
* utilited by the @function connect to check if the connection is close, if so attempts to reconnect
*/

const check = (setWs, state) => {

    const  ws = state;
    if (!ws || ws.readyState == WebSocket.CLOSED) Connect(setWs,state)
    alert('la connexion au websocket a ete perdue');
        ; //check if websocket instance is closed, if so call `connect` function.
};