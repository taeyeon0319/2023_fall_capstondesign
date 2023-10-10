// user.mjs
import express from 'express';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.json("success회원");
});

export default userRouter;
