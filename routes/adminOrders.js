const express = require('express');
const router = express.Router();
const pool = require('../db');
const adminAuth = require('../middlewares/adminAuth');

// GET /admin/orders
router.get('/orders', adminAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
         o.id,
         o.total_price,
         o.status,
         o.created_at,
         u.name AS customer_name,
         u.email AS customer_email,
         GROUP_CONCAT(CONCAT(p.name, ' x', oi.quantity) SEPARATOR ', ') AS items
       FROM orders o
       JOIN users u ON o.user_id = u.id
       LEFT JOIN order_items oi ON oi.order_id = o.id
       LEFT JOIN products p ON p.id = oi.product_id
       GROUP BY o.id
       ORDER BY o.created_at DESC
       LIMIT 100`
    );
    res.json(rows);
  } catch (err) {
    console.error('GET /admin/orders error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /admin/orders/:id
router.get('/orders/:id', adminAuth, async (req, res) => {
  const orderId = req.params.id;
  try {
    const [[order]] = await pool.query('SELECT o.*, u.name AS customer_name, u.email AS customer_email FROM orders o JOIN users u ON o.user_id = u.id WHERE o.id = ?', [orderId]);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const [items] = await pool.query(
      `SELECT oi.id, oi.product_id, p.name AS product_name, oi.quantity, oi.unit_price
       FROM order_items oi
       JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id = ?`,
      [orderId]
    );

    res.json({ order, items });
  } catch (err) {
    console.error('GET /admin/orders/:id error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
