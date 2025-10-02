import { Request, Response } from "express";
import Cart from '../modals/Cart';

// יצירת סל קניות חדש
export const createCart = async (req: Request, res: Response) => {
  try {
    const cart = new Cart(req.body);
    const saved = await cart.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to create cart", details: err });
  }
};

// קבלת כל הסלים
export const getCarts = async (_req: Request, res: Response) => {
  try {
    const carts = await Cart.find().populate("owner").populate("products");
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ error: "Failed to get carts", details: err });
  }
};

// קבלת סל לפי ID
export const getCartById = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findById(req.params.id).populate("owner").populate("products");
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to get cart", details: err });
  }
};

// עדכון סל
export const updateCart = async (req: Request, res: Response) => {
  try {
    const updated = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Cart not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update cart", details: err });
  }
};

// מחיקת סל
export const deleteCart = async (req: Request, res: Response) => {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Cart not found" });
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete cart", details: err });
  }
};
