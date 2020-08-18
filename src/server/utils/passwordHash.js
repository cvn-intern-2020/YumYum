import bcrypt from "bcryptjs";

const passwordHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

export default passwordHash;
