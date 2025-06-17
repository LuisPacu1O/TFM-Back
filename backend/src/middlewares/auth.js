const jwt = require('jsonwebtoken');


function authMiddleware(req, res, next) {
  const {token} = req.cookies;
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido', err: err.message });
  }
}

function adminMiddleware(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Acceso denegado: se requiere rol de administrador' });
  }
}

module.exports = { authMiddleware, adminMiddleware };
