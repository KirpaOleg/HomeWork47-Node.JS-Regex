var express = require('express');
var router = express.Router();

const validBday = (req, res, next) => {
  const { birthDay } = req.body;
  const birthDayRegex = /^(0?[1-9]|[12][0-9]|3[01]).(0?[1-9]|1[0-2]).(19[2-9][0-9]|20(0[0-9]|1[0-5]))$/;
  req.body.birthDayValidDateResult = birthDayRegex.test(birthDay);
  next();
}

const validName = (req, res, next) => {
  const { name } = req.body;
  const nameRegex = /^[A-Z ]{1}[a-z]{0,} {1}[A-Z ]{1}[a-z]{0,}$/;
  req.body.nameValidResult = nameRegex.test(name);
  next();
}

router.post('/testPost', validBday, validName, function(req, res, next) {
  const { birthDay } = req.body
  const { name } = req.body

  const txtBday = req.body.birthDayValidDateResult ?
  `${ birthDay } birthDay is valid` :
  `${ birthDay } birthDay is not valid`;

  const txtName = req.body.nameValidResult ?
  `${ name } name is valid` :
  `${ name } name is not valid`;

  const txtValidUser = `${txtBday} \n ${txtName}`
  res.send(txtValidUser);

});
module.exports = router;  
