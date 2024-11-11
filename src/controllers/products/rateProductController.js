import Product from "../models/Product.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import rateProductService from "../../services/products/rateProductService.js";

const rateProductController = async (req, res, next) => {
  try {
    const { rate } = req.body;
    await rateProductService;
  } catch (next) {}
};

export default rateProductController;
