import http from "http";

import { Server }
from "socket.io";

import app
from "./app.js";

import {
  initSocket,
} from "./realtime/socket.js";

import {
  joinUserRooms,
} from "./realtime/rooms.js";

import {
  verifySocketToken,
} from "./realtime/socketAuth.js";



const server =
  http.createServer(app);



const io = new Server(server, {

  cors: {

    origin: "*",

    methods: [
      "GET",
      "POST",
    ],
  },
});



initSocket(io);



// 🟣 JWT SOCKET AUTH
io.use(
  verifySocketToken
);



// 🟣 SOCKET CONNECTION
io.on(
  "connection",

  async (socket) => {

    console.log(
      "🟢 Usuario conectado:",
      socket.id
    );



    // 🔥 REAL USER
    const user =
      socket.user;



    console.log(
      "👤 Socket user:",
      user
    );



    // 🔥 JOIN ROOMS
    await joinUserRooms(
      socket,
      user
    );



    socket.on(
      "disconnect",
      () => {

        console.log(
          "🔴 Usuario desconectado:",
          socket.id
        );
      }
    );
  }
);



export default server;