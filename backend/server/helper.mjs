// helper.mjs
import express from 'express';

const helperRouter = express.Router();

helperRouter.get('/', (req, res) => {
    res.json("success도우미");
});

export default helperRouter;
