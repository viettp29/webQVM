const user = require("../models/users");
const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;

exports.signUp = async (req, res, next) => {
  res.render("users/signUp");
};

exports.signUpPost = async (req, res, next) => {
  const account = await user.get(req.body.email);
  if (account)
    return res.render("users/signUp", { message: "Tài khoản đã tồn tại!" });
  const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
  const data = {
    ho: req.body.ho,
    ten: req.body.ten,
    diaChi: req.body.diaChi,
    tp: req.body.tp,
    sdt: req.body.sdt,
    email: req.body.email,
    password: hashPassword,
  };
  await user.add(data);
  res.redirect("/");
};

exports.loginGet = async (req, res, next) => {
  res.render("users/login");
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

exports.info = async (req, res, next) => {
  res.render("users/info", { user: req.user });
};

exports.edit = async (req, res, next) => {
  res.render("users/edit", { user: req.user });
};

exports.editPost = async (req, res, next) => {
  await user.update(req.user.email, req.body);
  res.redirect("info");
};
