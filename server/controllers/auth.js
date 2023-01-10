import User from '../models/user.js';

export const createOrUpdateUser = async (req, res) => {
    const { name, picture, email } = req.user;

    const user = await User.findOneAndUpdate(
        {
            email: email // first argument, find by what
        },
        {
            name: name, // what to update
            picture: picture
        },
        { new: true } // return new updated info
    )

    if (user) {
        console.log('User updated: ', user);
        res.json(user);
    } else {
        const newUser = await new User({
            email, 
            name, 
            picture,
        }).save();
        console.log('User created: ', newUser);
        res.json(newUser);
    }
};