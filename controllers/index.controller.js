const asyncHandler = require("express-async-handler");
const { Message, User } = require("../db/query");
const {
   validateMessage,
   validateAdminPassword,
   validateMemberPassword,
} = require("../validation/validation");

const homePage = asyncHandler(async (req, res, next) => {
   const messages = await Message.getAllMessages();

   res.render("index", { messages });
});

const createMessageGet = (req, res) => {
   res.render("message_form");
};

const createMessagePost = [
   validateMessage,
   asyncHandler(async (req, res) => {
      const { title, text } = req.body;

      await Message.createMessage({ title, text, userId: req.user.id });

      res.status(201).redirect("/");
   }),
];

const memberFormGet = (req, res) => {
   res.render("member_admin_form", { role: "Member", title: "Member Form" });
};

const memberFormPost = [
   validateMemberPassword,
   asyncHandler(async (req, res) => {
      await User.updateUserToMember(req.user.id);
      res.redirect("/");
   }),
];

const adminFormGet = (req, res) => {
   res.render("member_admin_form", { title: "Admin Form", role: "Admin" });
};
const adminFormPost = [
   validateAdminPassword,
   asyncHandler(async (req, res) => {
      await User.updateUserToAdmin(req.user.id);
      res.redirect("/");
   }),
];

module.exports = {
   homePage,
   createMessageGet,
   createMessagePost,
   adminFormGet,
   adminFormPost,
   memberFormGet,
   memberFormPost,
};
