const UserController = {};
const User = require('../models/User');
const bcrypt = require('bcrypt');

UserController.postUser = (req, res) => {
    var user = new User();

   const {name,lastname,username,role}=req.body;
    user.name =name;
    user.lastname = lastname;
    user.username = username;
    user.password = bcrypt.hashSync(req.body.password,8);
    user.role =role;
  
    if (user.name && user.lastname &&  user.username && user.password && user.role ) {
      user.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the user', err)
          res.json({
            error: 'There was an error saving the user'
          });
        }
        res.status(201);//CREATED
        res.header({
          'location': `http://localhost:4000/api/users/?id=${user.id}`
        });
        res.json(user);
      });
    } else {
      res.status(422);
      console.log('error while saving the user')
      res.json({
        error: 'No valid data provided for user'
      });
    }
  };

//get all users
UserController.getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}

//get only one user
UserController.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.json(error);
    }
}

//delete user of database
UserController.deleteUser = async (req, res) => {
    try {
         await User.findByIdAndDelete(req.params.id);
         res.json('User is Deleted');
    } catch (error) {
        res.json(error);
    }
}

//update date of some user
UserController.updateUser = async (req, res) => {
      try {
            const {name,lastname,username,password}=req.body;
            await User.findOnedAndUpdate(req.params.id,{name,lastname,username,password});
            res.status(400).json('User updated');
      } catch (error) {
           res.json(error);
      }
}

module.exports = UserController;