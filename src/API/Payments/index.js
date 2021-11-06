// Libraries
import express from "express";
import passport from "passport";
import Razorpay from "razorpay";
import { v4 as uuidv4 } from "uuid";

// Database Modal
import { MenuModel } from "../../database/allModels";

const Router = express.Router();

/*
Route           /payments/new
Des             For creating a order/payment
Params          none
Access          Public
Method          POST
*/

Router.post("/new", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RZR_PAY_ID,
      key_secret: process.env.RZR_PAY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: `${uuidv4()}`,
    };
    const order = await instance.orders.create(options);

    return res.json({ order });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
