const { Order, CartItem } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { sendEmail } = require("../helpers/index.js");


exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        });
};

exports.create = (req, res) => {
    console.log('CREATE ORDER: ', req.body);
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            res.status(400).json({
                error: errorHandler(error)
            });
            return;
        }
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount
        email = req.profile.email;
        const emailData = {
          from: "noreply@node-react.com",
          to: email,
          subject: "Order Placed Successfully!",
          text: `Your order has been placed successfully.`,
          html: `
                <h2> Your Order Details </h2>
                <table>
                <tbody>
                <tr style="background-color:black; color:white">
                <th scope="row"> Customer Name </th>
                <td> ${req.profile.name} </td>
                </tr>
                <tr>
                <th scope="row"> Total Products </th>
                <td> ${order.products.length} </td>
                </tr>
                <tr style="background-color:black; color:white">
                <th scope="row"> Total Cost </th>
                <td> Rs. ${order.amount} </td>
                </tr>
                <tr>
                <th scope="row"> Order Status </th>
                <td> ${order.status} </td>
                </tr>
                <tr style="background-color:black;color:white">
                <th scope="row"> Order Date </th>
                <td> ${order.created} </td>
                </tr>
                </tbody>
                </thead>
                 <p>Login to dashboard to view order in detail.</p>
             `,
        };
    
        //testing
        sendEmail(emailData).finally(() => {
          return res.json({
            data: data,
            message1: `Order Placed Successfully! Order details have been sent to ${email}.`,
          });
        });
      });
    };

exports.listOrders = (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(orders);
        });
};

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
};

exports.updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(order);
    });
};
