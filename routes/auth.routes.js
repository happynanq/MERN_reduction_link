const {Router} = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const {check, validationResult} = require("express-validator")
const User = require("../models/User")
const router = Router()

// /api/auth
router.post(
  "/register",
  [
    check('email', "Некорректный емаил").isEmail(),
    check('password', "Минимальная длина пароля 6 символов").isLength({min:6})
  ],
  async(req,res)=>{
  try {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({message:"Некорректные данные при регистрации", errors:errors.array()})
    }

    const {email,password} = req.body
    
    let candidate = await User.findOne({email})
    if(candidate){
      res.status(400).json({message:"Такой пользователь уже существует"})
      return
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({email, password:hashedPassword})

    await user.save()
    res.status(201).json({message:"Пользователь создан"})

  } catch (e) {
    res.status(500).json({message:"Что-то пошло не так, попробуйте снова"})
  }
})

// /api/auth
router.post(
  "/login",
  [
    check('email', "Введите корректный емаил").normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async(req,res)=>{
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return res.status(400).json({message:"Некорректные данные при входе в систему", errors:errors.array()})
      }
  
      const {email,password} = req.body
      
      let user = await User.findOne({email})
      if(!user){
        return res.status(400).json({message:"Пользователь не найден"})
      }
      const isMatch = bcrypt.compare(password, user.password)
      if(!isMatch){
        return res.status(400).json({message:"Неверный пароль, попробуйте снова"})
      }
      let token = jwt.sign(
        {userId:user.id},
        config.get("jwtSecret"),
        {
          expiresIn:"1h"
        }
      )
      res.json({token,userId:user.id, message:"Вы вошли в систему"})
    } catch (e) {
      res.status(500).json({message:"Что-то пошло не так, попробуйте снова"})
    }
})


module.exports = router