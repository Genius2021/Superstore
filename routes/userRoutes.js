const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { isAuth } = require("../utils.js");
const { postUserSignin, postUserRegister, putUserProfile, deleteUser } = require("../controller/userController.js");

const userRouter = express.Router();

userRouter.post("/signin", expressAsyncHandler(postUserSignin));

userRouter.post("/register", expressAsyncHandler(postUserRegister));

userRouter.put("/profile", isAuth, expressAsyncHandler(putUserProfile));

userRouter.delete("/delete", isAuth, expressAsyncHandler(deleteUser));



// userRouter.get("/:id", expressAsyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);
//     if (user) {
//         res.send(user)
//     } else {
//         res.status(404).send({ message: "User Not Found" })
//     }
// }));



module.exports = userRouter;