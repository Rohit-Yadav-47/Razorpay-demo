const express = require("express");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

const razorpay = new Razorpay({
    key_id: "",
    key_secret: "",
});

// Setting up EJS as the template engine
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// Mock products (in a real app, this would come from a database)
const products = [
    { id: 1, name: "Product 1", price: 5 },
    { id: 2, name: "Product 2", price: 10 },
    { id: 3, name: "Product 3", price: 15 },
];

// Initialize cart as a global variable
let cart = [];

// Middleware to make cart available to all routes
app.use((req, res, next) => {
    res.locals.cart = cart;
    next();
});

// Home page to display products
app.get("/", (req, res) => {
    res.render("home", { products });
});

// Add to cart functionality
app.post("/add-to-cart", (req, res) => {
    const productId = parseInt(req.body.productId);
    const product = products.find((p) => p.id === productId);
    if (product) {
        cart.push(product);
    }
    res.redirect(req.headers.referer || '/');
});

// Display cart
app.get("/cart", (req, res) => {
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    res.render("cart", { total });
});

// Create Razorpay order and proceed to checkout
app.post("/checkout", async (req, res) => {
    const totalAmount = cart.reduce((sum, product) => sum + product.price, 0) * 100;

    try {
        const order = await razorpay.orders.create({ 
            amount: totalAmount, 
            currency: "INR" 
        });
        res.render("checkout", { 
            orderId: order.id, 
            amount: totalAmount / 100, 
            keyId: razorpay.key_id 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating order");
    }
});

// Verify payment
app.post("/verify", (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const generatedSignature = crypto
            .createHmac("sha256", razorpay.key_secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature === razorpay_signature) {
            cart = []; // Clear cart on successful payment
            res.render("success", { 
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id
            });
        } else {
            res.render("failure");
        }
    } catch (error) {
        console.error('Verification Error:', error);
        res.render("failure");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



