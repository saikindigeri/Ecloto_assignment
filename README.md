# Shopping Cart App

A simple React-based shopping cart application built with Tailwind CSS. This app allows users to browse products, add them to a cart, adjust quantities, and receive a gift card when the subtotal reaches a threshold.

## Features

- **Product Listing**: Displays a list of products with names, prices, and quantity selectors.
- **Add to Cart**: Each product has an "Add to Cart" button and +/- buttons to adjust quantities.
- **Cart Management**: View cart items, update quantities, and remove items (except the gift card).
- **Gift Card**: Automatically adds a $50 gift card to the cart when the subtotal reaches $1000. The gift card is removed if the subtotal drops below the threshold.
- **Progress Bar**: Visual indicator of how close the subtotal is to unlocking the gift card.
- **Responsive Design**: Styled with Tailwind CSS for a clean, modern look that works on various screen sizes.
- **State Management**: Uses React's `useState` and `useEffect` hooks to manage products and cart state.

## Demo

(You can add a live demo link or screenshot here if hosted, e.g., via GitHub Pages or a service like CodeSandbox.)

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/saikindigeri/Ecloto_assignment.git
   cd my-project
   npm install
2.**Run the App**
   npm run dev
   server will start on localhost:5173
