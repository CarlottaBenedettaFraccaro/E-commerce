import orderListService from "../services/orderListService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const orderListController = async (req, res, next) => {
    try {
        const orders = await orderListService();
        res.status(200).json({ status: 'ok', data: orders });
    } catch (error) {
        next(error);
    }
};

export default orderListController;