const Chat = require("../models/chat");
const User = require("../models/user");
exports.chatMemebers = async (req, res) => {
  let chatId = req.params.id;
  let members = await Chat.find({_id:chatId}, { users: true }).populate(
    "users",
    "-password"
  );
  res.status(200).json(members);
};
exports.allChats = async (req, res) => {
  let id = req.body.id;
  console.log(req.body);
  
  let chat = await Chat.find(
    {
      $or: [
        { users: { $elemMatch: { $eq: id } } },
        { users: { $elemMatch: { $eq: id } } },
      ],
    },
    { users: true, _id: true }
  )
    .populate("users", "-password")
    .populate("latestMessage");
  res.status(200).json(chat);
};
exports.getChat = async (req, res) => {
  let users = req.body.users;
  console.log(users);
  let ok = true;
  if(req.body.users.length) ok = true
  let chat = await Chat.find({
    isGroupChat: ok,
    users: { $eq: users },
  })
    .populate("users", "-password")
    .populate("latestMessage");
  if (chat.length) {
    res.status(200).json(chat[0]);
  } else {
    try {
      const createdChat = await Chat.create({
        chatName: "new Chat",
        isGroupChat: ok,
        users: users,
      });
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};
