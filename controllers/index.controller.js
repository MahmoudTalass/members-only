const asyncHandler = require("express-async-handler");
const { Message } = require("../db/query");

const homePage = asyncHandler(async (req, res, next) => {
   const messages = await Message.getAllMessages();

   res.render("index", { messages });
});

const createMessageGet = (req, res) => {
   res.render("message_form");
};

const createMessagePost = asyncHandler(async (req, res) => {
   const { title, text } = req.body;

   await Message.createMessage({ title, text, userId: req.user.id });

   res.status(201).redirect("/");
});

module.exports = {
   homePage,
   createMessageGet,
   createMessagePost,
};
