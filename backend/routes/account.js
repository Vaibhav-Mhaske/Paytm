const express = require("express")
const zod = require("zod")
const { authMiddleware } = require("../middleware")
const { Account } = require("../db")

const router = express.Router()

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })
    res.json({
        balance: account.balance
    })
})


router.post("/transfer", async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({
        userId: req.userId
    }).session(session)

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if (!toAccount) {
        await session.abortTransaction()
        res.status(400).json({
            message: "Invalid User"
        })
    }

    // else perform the transfer 
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session)
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session)

    // commit transaction
    await session.commitTransaction();

    res.json({
        message: "Transaction Complete"
    })
})

module.exports = router;