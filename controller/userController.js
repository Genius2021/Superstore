const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken, isAuth, capitalize } = require("../utils.js");


const postUserSignin = async (req, res) =>{
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.status(200).send({
                    _id: user._id,
                    firstName: user.firstName,
                    email: user.email,
                    picture: user.picture,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                    message: `Welcome back Big Boss! ${capitalize(user.username)}, you are now logged in!`,
                });

            }else{
                res.status(403).send({ message: "Invalid password" });
            }
        }else{
            res.status(204).send({ message: "No User with such credentials exist!" });
        }
    
}

const postUserRegister = async (req, res) =>{
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            mobileNumber: req.body.mobileNumber,
            picture: req.body.picture,
            password: bcrypt.hashSync(req.body.password, 8),
            isAdmin: req.body.isAdmin,
        });
    
        const createdUser = await user.save();
        res.status(201).send({
            _id: createdUser._id,
            firstName: createdUser.firstName,
            email: createdUser.email,
            picture: createdUser.picture,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser),
            message: `Congratulations ${createdUser.firstName}, you have successfully registered! Now, Log in.`
        });
}


const putUserProfile = async (req, res) =>{
    const user = await User.findById(req.user._id);
    if (user) {
        if (req.body.currentPassword){
            if (bcrypt.compareSync(req.body.currentPassword, user.password)){
                hashedNewPassword = bcrypt.hashSync(req.body.newPassword, 8);
                user.firstName = req.body.newFirstName || user.firstName;
                user.lastName = req.body.newLastName || user.lastName;
                // user.city = req.body.newCity || user.city;
                // user.postalCode = req.body.newPostalCode || user.postalCode;
                // user.country = req.body.newCountry || user.country;
                user.password = hashedNewPassword || user.password;
                user.address = req.body.newAddress || user.address;
                user.picture = req.body.filename || user.picture;

                try {
                       const updatedUser = await User.findByIdAndUpdate(req.user._id, {
                           $set: user,
                       }, {new: true});

                        //    OR
                    // const updatedUser = await user.save();

                    res.status(200).send({
                        _id: updatedUser._id,
                        firstName: updatedUser.firstName,
                        email: updatedUser.email,
                        picture: updatedUser.picture,
                        isAdmin: updatedUser.isAdmin,
                        token: generateToken(updatedUser),
                        message: "Boss!, you have successfully updated your profile.",
                    });

                } catch (error) {
                    res.status(500).json(error)
                }

            }else{
                res.status(403).send({ message:  "You entered an incorrect current password!" });
            }
        
        }else{
            res.status(403).send({ message:  "You must enter a valid current password to make any updates!" });
        }

    }else{
        res.status(401).send({ message: "Oops! User, Was Not Found." });
    }

}

const deleteUser = async (req, res) =>{
    const user = await User.findById(req.user._id);
    if (user) {
        await User.findByIdAndDelete(req.user._id);
        res.status(200).send({message: "You have successfully deleted your account. Tell us more, why you left."})
    }else{
        res.status(204).send({message: "User does not exist!"});

    }  
}

module.exports ={
    postUserSignin,
    postUserRegister,
    putUserProfile,
    deleteUser,
}