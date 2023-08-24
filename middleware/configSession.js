import session from 'express-session';

export const configSession = () => {

    return session({
        secret: 'segredo-sessao',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: 'strict'
        }
    })
}

