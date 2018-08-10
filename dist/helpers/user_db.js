const db = require('./db');

module.exports.new = (/* params here */) => {
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