import db from '../database/db';

export const newUser = (/* params here */) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none('insert into users (/* params here */) values (/* params here */)', [ /* params here */ ]).then((data) => {
                res(data);
                obj.done();
            }).catch((error) => {
                rej(error);
                obj.done();
            });
        }).catch((error) => {
            rej(error);
        });
    });
}

export const getUserByEmail = (username) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.one('SELECT * FROM users where email = $1', [username]).then((data) => {
                res(data);
                obj.done();
            }).catch((error) => {
                rej(error);
                obj.done();
            });
        }).catch((error) => {
            rej(error);
        });
    });
}