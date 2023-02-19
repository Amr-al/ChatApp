const User = require("../models/user");
const JWT = require("jsonwebtoken");
const JWT_SECRET = "hexa";
exports.login = async (req, res) => {
  try {
    let user = await User.find({
      name: req.body.name,
      password: req.body.password,
    });
    console.log(user);
    if (user.length) {
     let token = JWT.sign({ user }, JWT_SECRET);
      res.status(200).json({acessToken:token});
    } else {
      res.status(404).json("login");
    }
  } catch (err) {
    res.status(404).json("login");
  }
};

exports.signup = async (req, res) => {
    try {
      let user = await User.find({
        name: req.body.name,
        password: req.body.password,
      });
      console.log(user);
      if (user.length) {
        res.status(500).json("failed");
      } else {
        user = new User({
            name:req.body.name,
            password: req.body.password,
            email: req.body.email
        })
        user = await user.save()
        
        let token = JWT.sign( {user} , JWT_SECRET);
        res.status(200).json({acessToken:token});
      }
    } catch (err) {
        console.log(err);
      res.status(404).json("login");
    }
  };

  exports.getFriends= async (req,res)=>{
    let id = req.body.id
    let users = await User.find({_id:{$ne:id}},{name:true, _id:true, pic:true, email:true});
    res.json(users)
  }