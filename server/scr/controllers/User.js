const UserController = {};
const User = require('../models/User');

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
            await User.findByIdAndUpdate(req.params.id,{name,lastname,username,password});
            res.status(400).json('User updated');
      } catch (error) {
           res.json(error);
      }
}

module.exports = UserController;