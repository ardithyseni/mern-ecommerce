import admin from '../firebase/index.js';

// https://expressjs.com/en/guide/writing-middleware.html

export const authCheck = async (req, res, next) => {
    // console.log(req.headers); // token request
    try {
        const firebaseUser = await admin.auth()
            .verifyIdToken(req.headers.idToken,); // match from Login.js frontend
        console.log('Firebase user in authcheck: \n', firebaseUser);
        req.user = firebaseUser;
        next();

    } catch (error) {
        console.log('Error authcheck middleware method: ', error);
        res.status(401).json({
            error: 'Invalid or expired token',
        })
    }
    // next();
}

