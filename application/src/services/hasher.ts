import bCrypt from 'bcrypt';


export function generateHash (password: string) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10)
    );
}