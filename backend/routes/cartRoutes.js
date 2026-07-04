const express = require('express');
const { getCart, addCartItem, updateCartItem, removeCartItem, clearCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addCartItem);
router.put('/:id', authMiddleware, updateCartItem);
router.delete('/:id', authMiddleware, removeCartItem);
router.delete('/', authMiddleware, clearCart);

module.exports = router;
