import { usersSwagger } from './src/swagger/paths/users.js';
import { moodsSwagger } from './src/swagger/paths/moods.js';
import { swaggerTags } from './src/swagger/swaggerTags.js';

export const swaggerSpec = {
    openapi: '3.0.0',

    info: {
        title: 'Mood Tracker API',
        version: '1.0.0',
        description: 'API documentation for Mood Tracker backend',
    },

    servers: [
        {
            url: 'http://localhost:8080',
        },
    ],

    tags: swaggerTags,

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
                    username: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                },
            },

            UserLogin: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                },
            },

            UserUpdate: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
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
