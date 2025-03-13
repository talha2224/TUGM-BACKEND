const combineRouter = require("express").Router()


combineRouter.use("/account",require("./account.router"))
combineRouter.use("/product",require("./product.router"))
combineRouter.use("/category",require("./category.router"))
combineRouter.use("/order",require("./order.router"))
combineRouter.use("/payment",require("./payment.router"))
combineRouter.use("/stream",require("./stream.router"))

// combineRouter.use("/feedback",require("./feedback.router"))
// combineRouter.use("/notification",require("./notification.router"))
// combineRouter.use("/notes",require("./notes.router"))
// combineRouter.use("/track",require("./track.router"))
// combineRouter.use("/sound",require("./sound.router"))
// combineRouter.use("/beat",require("./beat.router"))
// combineRouter.use("/ticket",require("./ticket.router"))
// combineRouter.use("/performance",require("./performance.router"))





module.exports = combineRouter