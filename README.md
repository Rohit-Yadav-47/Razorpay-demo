# E-commerce Checkout App

This is a simple Node.js application that showcases an e-commerce checkout process with cart management, order processing, and payment verification using Razorpay. It uses Express for the server, EJS for templating, and Razorpay for payment handling.

## Features

- Display products and add them to the cart
- View and manage the cart
- Proceed to checkout and make a payment
- Verify payment success or failure

## Technologies Used

- Node.js
- Express.js
- Razorpay API
- EJS (for templating)

## Setup and Installation

### Prerequisites

- Node.js and npm
- Razorpay account (for payment integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Razorpay**
   - Open the `app.js` file.
   - Replace `key_id` and `key_secret` in the `razorpay` configuration with your Razorpay API credentials.

4. **Run the application**
   ```bash
   node app.js
   ```
   The app will be available at `http://localhost:3000`.

## Project Structure

```
|-- app.js               # Main server file and route handling
|-- views/               # Folder containing EJS templates
    |-- home.ejs         # Home page listing products
    |-- cart.ejs         # Cart page displaying added products and total
    |-- checkout.ejs     # Checkout page with Razorpay payment integration
    |-- success.ejs      # Payment success page
    |-- failure.ejs      # Payment failure page
```

## Routes

1. **Home (`/`)**
   - Displays available products with options to add them to the cart.

2. **Add to Cart (`/add-to-cart`)**
   - Adds a selected product to the cart.

3. **View Cart (`/cart`)**
   - Shows all products in the cart with a total price.

4. **Checkout (`/checkout`)**
   - Initiates a Razorpay order for the cart total.
   - Directs to the checkout page for payment processing.

5. **Verify Payment (`/verify`)**
   - Confirms the payment status using Razorpay's webhook.
   - Redirects to `success.ejs` on successful payment or `failure.ejs` on failure.

## Usage

1. **Adding Products to Cart**
   - On the home page, click "Add to Cart" for any product you wish to purchase.
   - View the cart by navigating to `/cart`.

2. **Checkout**
   - From the cart, proceed to checkout.
   - Complete the payment using Razorpay.

3. **Payment Verification**
   - Upon payment completion, the app verifies the payment status.
   - Displays either a success or failure page based on the verification.

## Important Notes

- Ensure Razorpay API credentials are correctly set in `app.js` for the checkout to work.
- The app uses mock data for products. For production, integrate a real database for product and cart data management.
