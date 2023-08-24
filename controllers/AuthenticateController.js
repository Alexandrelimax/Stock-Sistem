import Login from '../Stock-Sistem/models/LoginModel.js';
import User from '../Stock-Sistem/models/UserModel.js';
import { isInputEmpty } from '../utils/validationRegister.js'
import bcrypt from 'bcryptjs'


export default class AuthenticateController {

    static showRegister(req, res) {
        res.render('auth_pages/createAccount')
    }
    

    static async saveRegister(req, res) {

        const collectionError = [];

        try {
            isInputEmpty(req.body)
            console.log(req.body);

            const { first_name, last_name, email, password, passwordMatch } = req.body;
            const userExist = await User.findAll({ where: { email } })

            if (userExist) {
                collectionError.push('Este usuário já existe')
            }
            if (password !== passwordMatch) {
                collectionError.push(' A senha e a confirmação de senha não são iguais');
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

        isInputEmpty(req.body);
        const { email, password } = req.body;

        try {
            const userExist = await Login.findOne({ where: { email } })

            if (!userExist) {
                req.flash('erro', 'Este email não existe');
                return res.render('auth_pages/login');
            }
            const passwordMatch = await bcrypt.compare(password, userExist.password);

            if (!passwordMatch) {
                req.flash('erro', 'Senha incorreta');
                return res.render('auth_pages/login');
            }

            const user = await User.findOne({where:{email}}, { raw: true })

            req.session.UserId = user.id;

            res.redirect('products/add')


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message })
        }
    }


    static closeSystem(req, res) {
        req.session.destroy();
        res.redirect('/login');
    }
}

