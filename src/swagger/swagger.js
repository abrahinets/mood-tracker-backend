import { usersSwagger } from './paths/users.js';
import { moodsSwagger } from './paths/moods.js';

export const swaggerSpec = {
    openapi: '3.0.0',

    info: {
        title: 'Mood Tracker API',
        description: 'Backend API for Mood Tracker application',
        version: '1.0.0',
    },

    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Local server',
        },
    ],

    tags: [
        {
            name: 'Users',
            description: 'Users authentication and management',
        },
        {
            name: 'Moods',
            description: 'Mood records management',
        },
    ],

    paths: {
        ...usersSwagger,
        ...moodsSwagger,
    },

    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },

        schemas: {
            User: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    username: { type: 'string' },
                    email: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
            },

            UserRegister: {
                type: 'object',
                required: ['username', 'email', 'password'],
                properties: {
                    username: { type: 'string', minLength: 3 },
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', minLength: 6 },
                },
            },

            UserLogin: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string' },
                },
            },

            UserUpdate: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', minLength: 6 },
                },
            },

            Mood: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    mood: { type: 'string' },
                    note: { type: 'string' },
                    user: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
            },
        },
    },
};
