import bcrypt from "bcryptjs";

const passwordHash = (password) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
};

export default passwordHash;
