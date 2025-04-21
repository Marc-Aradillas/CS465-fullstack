const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: "All fields required" });
    }
  
    try {
      const user = new User();
      user.name = req.body.name;
      user.email = req.body.email;
      user.setPassword(req.body.password);
  
      await user.save();
  
      const token = user.generateJwt();
      res.status(200).json({ token });
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "All fields required" });
    }

    try {
        const user = await new Promise((resolve, reject) => {
            passport.authenticate('local', (err, user, info) => {
                if (err) return reject(err);
                if (!user) return reject({ status: 401, info });
                resolve(user);
            })(req, res);
        });

        const token = user.generateJwt();
        res.status(200).json({ token });

    } catch (err) {
      console.error("🔴 Login error:", err); 

        if (err.status === 401) {
            res.status(401).json(err.info);
        } else {
            res.status(500).json({ message: "Login failed", error: err });
        }
    }
};
 

module.exports = {
    register,
    login
};