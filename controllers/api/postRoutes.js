const router = require("express").Router();
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");
const { Post, User, Comment } = require("../../models");

module.exports = router;