const asyncHandler = require("express-async-handler");
const { Message, User } = require("../db/query");
const {
   validateMessage,
   validateAdminPassword,
   validateMemberPassword,
} = require("../middleware/validation");
const { isAuthenticated, isAdmin, isMember } = require("../middleware/auth.middleware");

const homePage = asyncHandler(async (req, res, next) => {
   const messages = await Message.getAllMessages();

   res.render("index", { messages });
});

const createMessageGet = [
   isAuthenticated,
   isMember,
   (req, res) => {
      res.render("message_form");
   },
];

const createMessagePost = [
   isAuthenticated,
   isMember,
   validateMessage,
   asyncHandler(async (req, res) => {
      const { title, text } = req.body;

      await Message.createMessage({ title, text, userId: req.user.id });

      res.status(201).redirect("/");
   }),
];

const memberFormGet = [
   isAuthenticated,
   (req, res) => {
      res.render("member_admin_form", { role: "Member", title: "Member Form" });
   },
];

const memberFormPost = [
   isAuthenticated,
   validateMemberPassword,
   asyncHandler(async (req, res) => {
      await User.updateUserToMember(req.user.id);
      res.redirect("/");
   }),
];

const adminFormGet = [
   isAuthenticated,
   (req, res) => {
      res.render("member_admin_form", { title: "Admin Form", role: "Admin" });
   },
];

const adminFormPost = [
   isAuthenticated,
   validateAdminPassword,
   asyncHandler(async (req, res) => {
      await User.updateUserToAdmin(req.user.id);
      res.redirect("/");
   }),
];

const deleteMessagePost = [
   isAuthenticated,
   isAdmin,
   asyncHandler(async (req, res) => {
      const { id } = req.params;
      await Message.deleteMessage(id);
      res.status(204).redirect("/");
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
   deleteMessagePost,
};
