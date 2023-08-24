export const sessionClient = ((req, res, next) => {
    if (req.session.UserId) {
        res.locals.session = req.session
    }
    next();
})

export const validSession = (req, res, next) => {
    const id = req.session.UserId

    if (!id) {
        req.flash('error', 'Faça o login');
        return res.redirect('/login')
    }
    next();
};

