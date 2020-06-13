const User = require("../models/user");
const { Order } = require("../models/order");
const Product = require('../models/product');
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

// exports.update = (req, res) => {
//     console.log('user update', req.body);
//     req.body.role = 0; // role will always be 0
//     User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, (err, user) => {
//         if (err) {
//             return res.status(400).json({
//                 error: 'You are not authorized to perform this action'
//             });
//         }
//         user.hashed_password = undefined;
//         user.salt = undefined;
//         res.json(user);
//     });
// };

exports.update = (req, res) => {
  // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
  const { name, password } = req.body;

  User.findOne({ _id: req.profile._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      });
    } else {
      user.name = name;
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: "Password should be min 6 characters long",
        });
      } else {
        user.password = password;
      }
    }

    user.save((err, updatedUser) => {
      if (err) {
        console.log("USER UPDATE ERROR", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;
      res.json(updatedUser);
    });
  });
};

exports.addOrderToUserHistory = (req, res, next) => {
  let history = [];
  req.body.order.products.map((item, i) => {
    Product.findOne({ _id: item._id }).exec((err, product) => {
      console.log("------------ " + item.quantity);
      console.log("------------ " + product);
      if (err) {
        res.status(400).json({ error: err });
        return next(res);
      }
      if (item.count > product.quantity) {
        let msg = `There are only ${product.quantity} ${item.name} books remaining.. Please decrease your ${item.name} books quantity in the orders to proceed.`;
        console.log("------------------------------------------- " + msg);
        res.status(400).json({
          message: msg,
        });
        return next(res);
      }
    });
  });

  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
      status: req.body.order.status,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (error, data) => {
      if (error) {
        res.status(400).json({
          error: "Could not update user purchase history",
        });
        return next(res);
      }
    }
  );
  next();
};

exports.purchaseHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name ")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(orders);
    });
};

exports.deleteUser = (req, res, next) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err)
      return res.status(400).json({
        error: err,
      });
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({ message: "User deleted successfully!" });
  });
};

exports.updateUser = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body); //extend - mutate the source object
  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res.status(400).json({
        error: "You are not authorized to perform this action",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({ user });
  });
};

exports.allUsers = (req,res) => {
  User.find((err,users) => {
    if(err) {
      console.log("In if all users")
    return res.status(400).json({
      error: err,
    }); }
    console.log(users)
    res.status(200).json(users)
  }).select("name email");
};