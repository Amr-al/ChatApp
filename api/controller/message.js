const Message = require("../models/message");
const Chat = require("../models/chat");
exports.allMessages = async (req, res) => {
  let chatId = req.body.chatId;
  let messages = await Message.find({ chat: chatId })
    .populate("sender", "name pic email")
    .populate("chat");

  res.json(messages);
};
exports.sendMessage = async (req, res) => {
  const { sender, content, chatId } = req.body;
 // console.log(sender);
  let resualt = await Message.create({
    sender: sender,
    content: content,
    chat: chatId,
  });
  res.json(resualt);
};
exports.updateLast = async (req, res) => {
  const {messageId, chatId} = req.body
  await Chat.findByIdAndUpdate(chatId,{latestMessage:messageId})
  res.json('200')
};
