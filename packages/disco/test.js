const WebSocket = require("ws");
let connected = false;
//https://discord.com/api/gateway

const ws = new WebSocket("wss://gateway.discord.gg/?v=6&encoding=json");

ws.on("open", (op) => {
  console.log("opa", op);
});

ws.on("message", (op) => {
  console.log("opa", op);
  if (!connected) {
    connect();
  }
});

ws.on("MESSAGE_CREATE", (ev) => {
  console.log("enviado mensagem " + ev);
});

ws.on("error", (err) => {
  console.log(err);
});

function connect() {
  ws.send(
    JSON.stringify({
      op: 2,
      d: {
        token: "NjA4MDMzOTY2OTI2MjAwODMy.XUiRwg.Rf3-TqLExWuPQjjxVaDCGv9V7cA",
        intents: 513,
        properties: {
          $os: "linux",
          $browser: "disco",
          $device: "disco",
        },
      },
    }),
  );
  connected = true;
}
