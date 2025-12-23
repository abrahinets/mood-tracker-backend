import * as usersService from '../services/usersService.js';

export const register = async (req, res) => {
    try {
        const data = await usersService.register(req.body);
        res.status(201).json(data);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

export const login = async (req, res) => {
    try {
        const data = await usersService.login(req.body);
        res.json(data);
    } catch (e) {
        res.status(401).json({ error: e.message });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await usersService.getById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.json(users);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await usersService.getById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            delete req.body.role;
        }

        const user = await usersService.update(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await usersService.remove(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
