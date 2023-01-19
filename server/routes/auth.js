import express from 'express';
const router = express.Router();
import { createOrUpdateUser, getCurrentUser } from "../controllers/auth.js";
import { authCheck, adminCheck } from '../middlewares/auth.js';

// middlewares

// import { authCheck } from '../middlewares/auth.js';

// const myMiddleware = (req, res, next) => {
//     console.log("IM A MIDDLEWARE");
//     next();
// }

router.post("/create-or-update-user", authCheck, createOrUpdateUser);

router.post("/current-user", authCheck, getCurrentUser);

router.post("/current-admin", authCheck, adminCheck, getCurrentUser);

// router.get('/testing', myMiddleware, (req, res) => {
//     res.json({
//         data: 'YOU SUCCESSFULLY TRIED MIDDLEWARE'
//     });
// });

export default router;