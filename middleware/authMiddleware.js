const jwt = require('jsonwebtoken');


// Token athentication function
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1]; 
  
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token.' });
      }
      req.user = user; // Aquí el `user` es el objeto decodificado del token
      next(); // Llama al siguiente middleware o controlador
    });
  }

  module.exports = { authenticateToken };