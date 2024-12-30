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

  let total = (discount)

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Fetched cart successfully"));
});

export const editCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { cart } = req.body;
});
