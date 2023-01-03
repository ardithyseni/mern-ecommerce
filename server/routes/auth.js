import express from 'express';

const router = express.Router();

import { createOrUpdateUser } from "../controllers/auth.js";

router.get("/create-or-update-user", createOrUpdateUser);

export default router;