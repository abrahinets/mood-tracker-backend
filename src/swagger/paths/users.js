export const usersSwagger = {
    '/api/v1/users/register': {
        post: {
            tags: ['Users'],
            summary: 'Register new user',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['username', 'email', 'password'],
                            properties: {
                                username: { type: 'string' },
                                email: { type: 'string' },
                                password: { type: 'string' },
                            },
                        },
                    },
                },
            },
            responses: {
                201: { description: 'User registered' },
                400: { description: 'Validation error' },
            },
        },
    },

    '/api/v1/users/login': {
        post: {
            tags: ['Users'],
            summary: 'Login user',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['email', 'password'],
                            properties: {
                                email: { type: 'string' },
                                password: { type: 'string' },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: 'Login success' },
                401: { description: 'Invalid credentials' },
            },
        },
    },

    '/api/v1/users/me': {
        get: {
            tags: ['Users'],
            summary: 'Get current user',
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: 'Current user data' },
                401: { description: 'Unauthorized' },
            },
        },
    },

    '/api/v1/users': {
        get: {
            tags: ['Users'],
            summary: 'Get all users (admin only)',
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: 'Users list' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden' },
            },
        },
    },

    '/api/v1/users/{id}': {
        get: {
            tags: ['Users'],
            summary: 'Get user by id (self or admin)',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                200: { description: 'User data' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden' },
                404: { description: 'User not found' },
            },
        },

        put: {
            tags: ['Users'],
            summary: 'Update user (self or admin)',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                username: { type: 'string' },
                                email: { type: 'string' },
                                password: { type: 'string' },
                                role: {
                                    type: 'string',
                                    enum: ['user', 'customer', 'admin'],
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: 'User updated' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden' },
                404: { description: 'User not found' },
            },
        },

        delete: {
            tags: ['Users'],
            summary: 'Delete user (admin only)',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                200: { description: 'User deleted' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden' },
                404: { description: 'User not found' },
            },
        },
    },
};
