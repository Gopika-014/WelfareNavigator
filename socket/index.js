/*const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require("dotenv").config({
  path: "./.env",
});

//app.use(cors());
app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world from socket server!");
});

// Array to store users
let users = [];

// Function to add a user to the users array
const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

// Function to remove a user from the users array
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// Function to get a user by userId
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

// Define a message object with a seen property
const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

// Object to store messages sent to each user
const messages = {};

io.on("connection", (socket) => {
  // When a user connects
  console.log("A user is connected.");

  // Take userId and socketId from user and add to users array
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users); // Emit all users to clients
    console.log("Current users:", users); // Debugging log
  });

  // Send and receive messages
  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = createMessage({ senderId, receiverId, text, images });
    const user = getUser(receiverId);

    // Ensure user exists before emitting message
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      console.log("Message sent to:", user.userId); // Debugging log
    } else {
      console.log(`Receiver user not found for receiverId: ${receiverId}`); // Debugging log
    }

    // Store the messages in the `messages` object
    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }

    console.log("Messages stored for receiver:", messages[receiverId]); // Debugging log
  });

  // Mark message as seen
  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);

    // Check if messages exist for the sender
    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) => message.receiverId === receiverId && message.id === messageId
      );

      // Ensure message exists before updating
      if (message) {
        message.seen = true;
        console.log("Message marked as seen:", message); // Debugging log

        // Notify the sender that their message was seen
        if (user?.socketId) {
          io.to(user.socketId).emit("messageSeen", { senderId, receiverId, messageId });
          console.log("Seen confirmation sent to sender:", senderId); // Debugging log
        } else {
          console.log(`Sender user not found for senderId: ${senderId}`); // Debugging log
        }
      } else {
        console.log(`Message not found for messageId: ${messageId}`); // Debugging log
      }
    } else {
      console.log(`No messages found for senderId: ${senderId}`); // Debugging log
    }
  });

  // Update and get last message
  socket.on("updateLastMessage", ({ lastMessage, lastMessagesId }) => {
    io.emit("getLastMessage", { lastMessage, lastMessagesId });
    console.log("Last message updated:", { lastMessage, lastMessagesId }); // Debugging log
  });

   // Handle cart reservation updates
   socket.on("processCartQueue", (reservedProducts) => {
    io.emit("queueProcessed", reservedProducts);
    console.log("Cart queue processed:", reservedProducts);
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected.");
    removeUser(socket.id);
    io.emit("getUsers", users); // Update users list
    console.log("Current users after disconnect:", users); // Debugging log
  });
});

// Start the server
server.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
*/

// index.js
const socketIO = require("socket.io");
const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "http://localhost:3000" } });

io.on("connection", (socket) => {
  console.log("User connected");

  // Queue processed event
  socket.on("processCartQueue", (reservedProducts) => {
    io.emit("queueProcessed", reservedProducts);
    console.log("Processed cart queue:", reservedProducts);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start server
server.listen(4000, () => console.log("Socket server running on port 4000"));

