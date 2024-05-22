# Inventory Management API

## Project Overview

This project is an inventory management API built with Node.js, Express, TypeScript, and MongoDB. It offers functionality for managing products and orders, including creating, retrieving, updating, and deleting products, as well as creating and retrieving orders. Key features include search functionality, inventory management, data validation with Zod, and error handling for various scenarios.

## Project Setup

1. **Initialize Project**:
   - Initialize a `package.json` file.
   - Install dependencies (`express`, `typescript`, `mongoose`, `cors`, `dotenv`, `ts-node-dev`).

2. **Set Up Express Server**:
   - Create a separate server file.

3. **Configuration**:
   - Connect to MongoDB using Mongoose.
   - Define configuration file and set up credentials.
   - Use parser middleware like `express.json` and `cors`.

4. **Modular Pattern**:
   - Define interfaces.
   - Implement schemas, models, and validation with Zod.
   - Set up routes, controllers, services, and integrate with the Express app.

5. **First API Hit**:
   - Implement GET and POST methods.
   
6. **ESLint Setup**:
   - Configure ESLint, set up rules, and ensure proper functionality.

## Requirements Met

- Implemented CRUD operations for products and orders.
- Search functionality for products.
- Error handling for various scenarios.
- Inventory management features.
- Validation with Zod.
- Clean, modular code adhering to naming conventions and proper comments.
- Consistent API endpoint structure.
- Linting with ESLint.
- Commit history demonstrating progress and revisions.

## To Run Locally

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or cloud-hosted)

### Installation

1. **Clone the repository**:

   ```
   git clone https://github.com/Shakil-Ahmmed8882/next-level-assignment-2.git
Install dependencies:

 `npm install`
 
### Set up environment variables:
Create a `.env`  file in the root directory and add the following variables:
MONGODB_URI=<your-mongodb-uri>
PORT=<desired-port>
### Running the Server
Start the development server
`npm run start:dev`
The API will be running at http://localhost:<PORT>.

### API Endpoints
##### Products
POST /api/products: Create a new product </br>
GET /api/products: Retrieve a list of all products </br>
GET /api/products/:productId: Retrieve a specific product by ID </br>
PUT /api/products/:productId: Update a product's information </br>
DELETE /api/products/:productId: Delete a product </br>
GET /api/products?searchTerm=<term>: Search for products by name </br>


##### Orders
POST /api/orders: Create a new order </br>
GET /api/orders: Retrieve all orders </br>
GET /api/orders?email=<email>: Retrieve orders by user email </br>
Acknowledgment

### Thank you
Thanks for reading patiently. 
