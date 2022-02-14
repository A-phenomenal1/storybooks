const bcrypt = require("bcryptjs");

export class Password {
    static toHash(password: string) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(password, salt);

        return hashedPass;
    }

    static compare(suppliedPassword: string, storedPassword: string){
        const result = bcrypt.compareSync(suppliedPassword, storedPassword);
        return result;
    }
}