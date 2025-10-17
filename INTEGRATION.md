Add the admin orders routes to your existing server.js. Example snippet to add near other app.use(...) lines:

const adminOrdersRouter = require('./routes/adminOrders');
app.use('/admin', adminOrdersRouter);

Ensure you have ADMIN_TOKEN set in your environment (.env) and restart the server. Use header x-admin-token for requests.

Testing examples:
GET /admin/orders with header x-admin-token: <your token>
GET /admin/orders/:id with header x-admin-token: <your token>

Notes:
- This is a simple header-based admin auth for testing. Replace with real auth (JWT/sessions) in production.
- db.js exports a mysql2/promise pool; if your project already has a pool, reuse it instead of adding db.js.
