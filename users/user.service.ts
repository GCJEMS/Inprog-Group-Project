import bcrypt from 'bcryptjs';
import db from '../_helpers/db';

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.User.findAll();
}

async function getById(id: number) {
    return getUser(id);
}

async function create(params: any) {
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw `Email "${params.email}" is already registered`;
    }

    const user = new db.User(params);
    user.passwordHash = await bcrypt.hash(params.password, 10);
    await user.save();
}

async function update(id: number, params: any) {
    const user = await getUser(id);
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }
    Object.assign(user, params);
    await user.save();
}

async function _delete(id: number) {
    const user = await getUser(id);
    await user.destroy();
}

async function getUser(id: number) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}