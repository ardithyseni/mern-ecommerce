import express from 'express';
const router = express.Router();
import { createOrUpdateUser } from "../controllers/auth.js";
import { authCheck } from '../middlewares/auth.js';

// middlewares

// import { authCheck } from '../middlewares/auth.js';

// const myMiddleware = (req, res, next) => {
//     console.log("IM A MIDDLEWARE");
//     next();
// }

router.post("/create-or-update-user", authCheck, createOrUpdateUser);

// router.get('/testing', myMiddleware, (req, res) => {
//     res.json({
//         data: 'YOU SUCCESSFULLY TRIED MIDDLEWARE'
//     });
// });

export default router;