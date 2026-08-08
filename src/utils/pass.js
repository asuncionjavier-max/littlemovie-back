import bcrypt, { hash } from "bcrypt";

const ROUNDS = 10;

export const crypt = async(password) => {
    const salt = await bcrypt.genSalt(ROUNDS)

        return  await bcrypt.hash(password, salt)

}

export const comparePass = async (password) =>{
    const compare = await bcrypt.compare(password, hash)
} 