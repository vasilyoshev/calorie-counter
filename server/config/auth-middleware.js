/**
 * Checks if user is logged in, by checking if user is stored in session.
 */
module.exports = authMiddleware = (req, res, next) => {
    if (!req.session || !req.session.username) {
        res.status(403).json({
            success: false,
            message: 'You must be logged in.'
        });
    } else {
        next();
    }
};