import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mood Tracker API',
            version: '1.0.0',
            description: 'API documentation for Mood Tracker backend',
        },
        servers: [
            {
                url: 'http://localhost:8080/api/v1',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
