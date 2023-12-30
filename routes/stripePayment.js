var express = require("express");
var router = express.Router();

const stripe = require("stripe")(
  "sk_test_51MhlhmBI7ZTpJ5xJENLYuKz1OHsPrZ9qwBkIqAepSLC21SQV9LhmDjgyFdLGUuNuXyJVgx8XXTARFvt5RpB08HZf00EUNwk62M"
);

router.post("/payment-sheet", async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: "cus_OjlFGeYC9TMFbu" },
    { apiVersion: "2022-11-15" }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.cost,
    currency: "usd", // VND, USD
    customer: "cus_OjlFGeYC9TMFbu",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: "cus_OjlFGeYC9TMFbu",
    publishableKey:
      "pk_test_51MhlhmBI7ZTpJ5xJUpmkPO48Z8X6ckuQeAN1Rcm9d88jUNlJCawJ1MFKYxPbqZFUeURK3M7m3jhCjdI3KXksOwf100gFkPoIL5",
  });
});
module.exports = router;
