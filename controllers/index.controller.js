const asyncHandler = require("express-async-handler");
const { Message } = require("../db/query");

const homePage = asyncHandler(async (req, res, next) => {
   const messages = await Message.getAllMessages();

   res.render("index", { messages });
});

module.exports = {
   homePage,
};
