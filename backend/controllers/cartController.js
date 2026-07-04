const { query } = require('../models/db');

exports.getCart = async (req, res) => {
  try {
    const [rows] = await query('SELECT id, menu_item, quantity, price FROM cart WHERE user_id = ?', [req.user.id]);
    return res.json({ items: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch cart items' });
  }
};

exports.addCartItem = async (req, res) => {
  const { menu_item, quantity, price } = req.body;

  if (!menu_item || !quantity || !price) {
    return res.status(400).json({ message: 'Menu item, quantity, and price are required' });
  }

  const count = Number(quantity);
  const itemPrice = Number(price);
  if (count < 1 || Number.isNaN(itemPrice)) {
    return res.status(400).json({ message: 'Quantity must be at least 1 and price must be valid' });
  }

  try {
    const [existingRows] = await query('SELECT id, quantity FROM cart WHERE user_id = ? AND menu_item = ? LIMIT 1', [req.user.id, menu_item]);
    if (existingRows.length) {
      const existing = existingRows[0];
      await query('UPDATE cart SET quantity = ? WHERE id = ?', [existing.quantity + count, existing.id]);
      return res.status(200).json({ message: 'Cart updated successfully' });
    }

    await query('INSERT INTO cart (user_id, menu_item, quantity, price, created_at) VALUES (?, ?, ?, ?, NOW())', [req.user.id, menu_item.trim(), count, itemPrice]);
    return res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to update cart' });
  }
};

exports.updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const count = Number(quantity);
  if (!id || count < 0 || Number.isNaN(count)) {
    return res.status(400).json({ message: 'Valid cart item id and quantity are required' });
  }

  try {
    if (count === 0) {
      await query('DELETE FROM cart WHERE id = ? AND user_id = ?', [id, req.user.id]);
      return res.json({ message: 'Cart item removed' });
    }

    await query('UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?', [count, id, req.user.id]);
    return res.json({ message: 'Cart item updated' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to update cart item' });
  }
};

exports.removeCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    await query('DELETE FROM cart WHERE id = ? AND user_id = ?', [id, req.user.id]);
    return res.json({ message: 'Cart item removed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to remove cart item' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await query('DELETE FROM cart WHERE user_id = ?', [req.user.id]);
    return res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to clear cart' });
  }
};
