import bCrypt from 'bcrypt';


export function generateHash (password) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null
    );
}