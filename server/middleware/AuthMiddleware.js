const jwt = require('jsonwebtoken');

function decodeToken(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    return token ? jwt.verify(token, process.env.SECRET_KEY) : false;
}

function сheckMethod(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    next();
}

function handleError(res, status = 500, message = 'An error occurred') {
    res.status(status).json({ message });
}   

const AuthMiddleware = {
    CheckAuth: (req, res, next) => {
        сheckMethod(req, res, function() {
            try {
                const decoded = decodeToken(req, res);
                if (decoded) {
                    req.user = decoded;
                    return next();
                }

                return handleError(res, 401, 'User is not authorized');
            } catch (error) {
                handleError(res, 500, error.message)
            }
        })
    },

    CheckRole: (role) => {
        return function(req, res, next) {
            сheckMethod(req, res, function() {
                try {
                    const decoded = decodeToken(req, res);
                    if (decoded) {
                        if (decoded.role === role) {
                            req.user = decoded;
                            return next();
                        }
                        return handleError(res, 403, 'You do not have permissions');
                    }

                    return handleError(res, 401, 'User is not authorized');
                } catch (error) {
                    handleError(res, 500, error.message)
                }
            })
        }
    }
}

module.exports = AuthMiddleware;