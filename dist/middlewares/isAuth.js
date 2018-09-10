export const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send({
            status: 400,
            response: 'Debes de haber iniciado sesion'
        });
    }
}
export const isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.send({
            status: 304,
            response: 'Ya existe una sesion'
        });
    } else {
        next();
    }
}
