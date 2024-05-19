import Order from '../models/orderModel.js';
import asyncHandler from '../utils/asyncHandler.js';

import Product from '../models/productModel.js';
import { calcPrices } from '../utils/calcPrices.js';
import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';

/////////////////////////////

//* Create new order
// @route Post /api/v1/orders/createOrder
// @access Private
export const createOrder = asyncHandler(async (req, res) => {
  /* const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    taxPrice,
    subTotal,
    total,
  } = req.body;

  if (!orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('💥 No order items.');
  }

  const newOrder = {
    orderItems: orderItems.map((order) => ({
      ...order,
      product: order.productId,
      _id: undefined,
    })),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    taxPrice,
    subTotal,
    total,
    isPaid: false,
    isDelivered: false,
  };

  const order = await Order.create(newOrder);

  if (!order) {
    res.status(404);
    throw new Error('💥 Invalid data sent.');
  }

  // Send Response
  res.status(201).json({
    status: 'success',
    data: order,
  });*/

  const { orderItems, shippingAddress, paymentMethod, subTotal } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // get the ordered items from our database
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x.productId) },
    });

    // map over the order items and use the price from our items from database
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient.productId
      );

      return {
        ...itemFromClient,
        product: itemFromClient.productId,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    // calculate prices
    const {
      itemsPrice: price,
      shippingPrice,
      taxPrice,
      totalPrice: total,
    } = calcPrices(dbOrderItems);

    const newOrder = {
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      price,
      taxPrice,
      subTotal,
      total,
      isPaid: false,
      isDelivered: false,
    };

    const order = await Order.create(newOrder);

    if (!order) {
      res.status(404);
      throw new Error('💥 Invalid data sent.');
    }

    // Send Response
    res.status(201).json({
      status: 'success',
      data: order,
    });
  }
});

//* Get logged in user orders
// @route Get /api/v1/orders/myOrders
// @access Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user._id });

  if (!order) {
    res.status(404);
    throw new Error('💥Please log in to access your orders');
  }

  // Send Response
  res.status(200).json({
    status: 'success',
    data: order,
  });
});

//* Get order by ID
// @route Get /api/v1/orders/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    res.status(404);
    throw new Error('💥 Order not found');
  }

  // Send Response
  res.status(200).json({
    status: 'success',
    data: order,
  });
});

//* Update order to paid
// @route Patch /api/v1/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  /* const updateOrder = {
    isPaid: true,
    paidAt: Date.now(),
    paymentResult: {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    },
  };

  const options = { new: true, runValidators: false };
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    updateOrder,
    options
  );

  if (!order) {
    res.status(404);
    throw new Error('💥Order not found');
  }

  // Send Response 🛩️
  res.status(200).json({
    status: 'success',
    data: { order },
  });*/

  const { verified, value } = await verifyPayPalPayment(req.body.id);
  if (!verified) throw new Error('Payment not verified');

  // check if this transaction has been used before
  const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  if (!isNewTransaction) throw new Error('Transaction has been used before');

  const order = await Order.findById(req.params.id);

  if (order) {
    // check the correct amount was paid
    const paidCorrectAmount = order.total === value * 1;
    if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

    const updateOrder = {
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      },
    };

    const options = { new: true, runValidators: true };
    const data = await Order.findByIdAndUpdate(
      req.params.id,
      updateOrder,
      options
    );

    if (!data) {
      res.status(404);
      throw new Error('💥Invalid data');
    }

    // Send Response 🛩️
    res.status(200).json({
      status: 'success',
      data,
    });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//////////////////////////
// A D M I N

//* Update order to delivered
// @route Patch /api/v1/orders/:id/deliver
// @access Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const updateOrder = {
    isDelivered: true,
    deliveredAt: Date.now(),
  };

  const options = { new: true, runValidators: true };
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    updateOrder,
    options
  );

  if (!order) {
    res.status(404);
    throw new Error('💥Order not found');
  }

  // Send Response 🛩️
  res.status(200).json({
    status: 'success',
    data: { order },
  });
});

//* Get all orders
// @route Get /api/v1/orders
// @access Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({}).populate('user', 'id name photo');

  if (!order) {
    res.status(404);
    throw new Error('💥 Order not found');
  }

  // Send Response
  res.status(200).json({
    status: 'success',
    data: order,
  });
});
