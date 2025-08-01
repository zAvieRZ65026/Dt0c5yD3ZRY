// 代码生成时间: 2025-08-02 02:10:16
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // 假设有一个User模型

// 创建一个新的Router实例
const authRouter = express.Router();
authRouter.use(bodyParser.json());

// Passport配置
passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// 用户登录路由
authRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.status(401).json({ message: info.message }); }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.status(200).json({ message: 'Logged in successfully.', user: user });
    });
  })(req, res, next);
});

// 用户登出路由
authRouter.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logged out successfully.' });
});

// 用户注册路由
authRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    // 检查用户名是否已存在
    let user = await User.findOne({ username: username });
    if (user) {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    // 创建新用户
    const hashedPassword = await bcrypt.hash(password, 12);
    user = new User({ username, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: 'User registered successfully.', user: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = authRouter;

// 请注意，这个代码示例假设你有一个User模型和一个bcrypt依赖库用于密码加密。
// 你可能还需要配置passport的session管理和其他中间件，这取决于你的应用程序的特定需求。