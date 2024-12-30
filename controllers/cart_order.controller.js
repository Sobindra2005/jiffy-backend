import Cart from "../models/Cart.model.js";
import User from "../models/User.model.js";

export const getCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(500, "User not found");
  }

  let cart = await Cart.find({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId });
  }

  let subtotal = +cart.map((item) => {
    return item.price;
  });

  let total = subtotal - (discount / 100) * subtotal;

  cart.subtotal = subtotal;
  cart.total = total;

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Fetched cart successfully"));
});

export const editCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { items } = req.body;

  if (!items || !Array.isArray(items)) {
    throw new ApiError(400, "Items are required and must be an array");
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  // Update the cart items
  cart.items = items;

  // Recalculate subtotal and total
  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = 0; // Replace with actual discount logic if needed
  const total = subtotal - (discount / 100) * subtotal;

  cart.subtotal = subtotal;
  cart.total = total;

  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart updated successfully"));
});

export const order = asyncHandler (async(req, res)=>{
    
})
