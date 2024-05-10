import express from 'express';
import User from "./User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const router = express.Router();


router.post('/create', async (req, res) => {

    try {
        const user = new User({
            firstname: req.body.firstname,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            role: req.body.role
        });
        await user.save();
        return res.json({
            message: 'user created',
            data: user
        }).status(201);
    }
    catch (err) {
        console.log('error occured', err)
    }

})

router.put('/update/:id', async (req, res) => {

    try {
        const { firstname, email, role, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const id = req.params.id;

        const updatedUser = await User.findByIdAndUpdate(id, {
            firstname: firstname,
            email: email,
            password: hashedPassword,
            role: role
        })

        if (updatedUser) {
            return res.json({
                message: 'user updated'
            }).status(200)
        }
    }
    catch (err) {
        console.log('error ocuured while updating user')
    }

})

router.get('/get/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);
        return res.json({
            data: user
        }).status(200);
    } catch (error) {
        console.log("error occured while finding the user", error);
    }
})

router.get('/getAllUser', async (req, res) => {
    try {
        const user = await User.find();
        return res.json({
            data: user
        }).status(200);
    } catch (error) {
        console.log("error occured while finding the user", error);
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
            return res.json({
                message: 'User deleted!'
            }).status(200);
        }

    } catch (error) {
        console.log("Error occurred while finding the user", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
)



router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        let data = {
            time: new Date(),
            id: user._id
        };

        const token = await jwt.sign(data, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h"
        });

        return res.status(200).json({
            message: 'User login successful',
            token: token
        });
    } catch (error) {
        console.log("Error occurred while finding the user", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router