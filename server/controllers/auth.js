import User from '../models/user.js';

export const createOrUpdateUser = async (req, res) => {
    const { name, picture, email } = req.user;

    const user = await User.findOneAndUpdate(
        {
            email: email // first argument, find by what
        },
        {
            name: email.split("@")[0], // what to update
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
            name: email.split("@")[0], 
            picture,
        }).save();
        console.log('User created: ', newUser);
        res.json(newUser);
    }
};


export const getCurrentUser = async (req, res) => {
    User.findOne({email: req.user.email }).exec((err, user) => {
        if (err) throw new Error(err)

        res.json(user);
    } );
};