import Login from '../models/LoginModel.js';
import User from '../models/UserModel.js';
import { isInputEmpty, invalidName } from '../utils/validationRegister.js'
import bcrypt from 'bcryptjs'


export default class AuthenticateController {

    static showRegister(req, res) {
        res.render('auth_pages/createAccount')
    }


    static async saveRegister(req, res) {

        if(isInputEmpty(req.body)){
            req.flash('error', 'Os campos não podem estar vazios!');
            return res.redirect('/register')
        }
        const collectionError = [];

        try {
            

            const { first_name, last_name, email, password, passwordMatch } = req.body;
            const userExist = await User.findAll({ where: { email } })

            if(invalidName(first_name, last_name)){
                collectionError.push('Os campos de nome e sobrenome devem conter apenas letras maiúsculas e minúsculas!')
            }

            if (userExist.length > 0) {
                collectionError.push('Este usuário já existe')
            }
            if (password !== passwordMatch) {
                collectionError.push(' A senha e a confirmação de senha não são iguais');
            }

            if (collectionError.length > 0) {
                collectionError.forEach((err) => {
                    req.flash('error', err)
                })
                return res.redirect('/register')
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const user = await User.create({ first_name, last_name, email });

            await Login.create({ email, password: hashPassword, userId: user.id })


            req.session.UserId = user.id;
            res.redirect('products/add')

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message })

        }
    }
    static showlogin(req, res) {
        res.render('auth_pages/login')
    }


    static async enterSystem(req, res) {
        

        if(isInputEmpty(req.body)){
            req.flash('error', 'Os campos não podem estar vazios!');
            return res.redirect('/login');
        }

        const { email, password } = req.body;

        try {
            const userExist = await Login.findOne({ where: { email } })

            if (!userExist) {
                req.flash('error', 'Este email não existe');
                return res.redirect('/login');
            }
            const passwordMatch = await bcrypt.compare(password, userExist.password);

            if (!passwordMatch) {
                req.flash('error', 'Senha incorreta');
                return res.redirect('/login');
            }

            const user = await User.findOne({ where: { email } }, { raw: true })

            req.session.UserId = user.id;

            res.redirect('products/add')


        } catch (error) {
            console.error(error);
            res.status(500).send('Erro no servidor')
        }
    }


    static closeSystem(req, res) {
        req.session.destroy();
        res.redirect('/login');
    }
}

