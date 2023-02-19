const express = require('express')
const app = require("express")();
const mongoose = require("mongoose");
const  cors = require('cors')

app.use(cors())

app.use(express.json())
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://0.0.0.0:27017/newChat");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};
connectDB();
const authRoute = require('./routers/auth')
const chatRoute = require('./routers/chat')
const messageRoute = require('./routers/message')
app.use('/auth', authRoute)
app.use('/chat',chatRoute)
app.use('/message', messageRoute)
app.listen(3005, () => {
  console.log("server is running");
});
