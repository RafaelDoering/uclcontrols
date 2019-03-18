const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const RSAKey = 'rsakey';

exports.get = (req, res) => {
  if(req.headers.authorization){
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, RSAKey, (errToken, decoded) => {
      if (errToken) {
        return res.status(401).json({
          ...errToken
        });
      }else{
        User.findById(decoded.id, (errUser, userFound) => {
          if (errUser) {
            return res.status(401).json({
              ...errUser
            });
          } else {
            return res.status(200).json({
              user: userFound
            });
          }
        });
      }
    });
  }else{
    res.status(400).json({
      errors: [
        "No user logged."
      ]
    });
  }
}

exports.signup = (req, res) => {
  if(req.body.name && req.body.email && req.body.password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
  
    const newUser = new User();
  
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = hash;
  
    newUser.save((errUser, createdUser) => {
      if (errUser) {
        return res.status(400).json({
          errors: [
            "Email já utilizado."
          ]
        });
      } else {
        const payload = {
          id: createdUser._id
        };
  
        const token = jwt.sign(payload, RSAKey, { expiresIn: '30d' });
  
        return res.status(200).json({
          user: {
            name: createdUser.name,
          },
          token: token
        });
      }
    });
  }else{
    res.status(400).json({
      errors: [
        "Error."
      ]
    });
  }
}

exports.login = (req, res) => {
  if(req.body.email && req.body.password){
    User.findOne({ email: req.body.email }, (errUser, userFound) => {
      if (errUser) {
        return res.status(400).json({
          ...errUser
        });
      } else {
        if (userFound) {
          if (bcrypt.compareSync(req.body.password, userFound.password)) {
            const payload = {
              id: userFound._id
            };

            const token = jwt.sign(payload, RSAKey, { expiresIn: '30d' });

            return res.status(200).json({
              user: {
                name: userFound.name,
              },
              token: token
            });
          } else {
            return res.status(400).json({
              errors: [
                "Senha incorreta."
              ]
            });
          }
        } else {
          return res.status(400).json({
            errors: [
              "Email não existente."
            ]
          });
        }
      }
    });
  }else{
    res.status(400).json({
      errors: [
        "Error."
      ]
    });
  }
}