import jwt from 'jsonwebtoken';
import generateErrorsUtils from '../utils/generateErrorsUtils.js';
import 'dotenv/config';

const authUser = (req, res, next) => {
    try {
        
        const { authorization } = req.headers;

        if(!authorization){
            throw generateErrorsUtils('Se esperaba un token por el header', 401);
        }

        let tokenInfo;

        try {
            
            tokenInfo = jwt.verify(authorization, process.env.SECRET);

        } catch (error) {
            throw generateErrorsUtils('Credenciales invalidas', 401);
        }

        req.user = tokenInfo;

        next();

    } catch (error) {
        next(error);
    }
}

export default authUser;
