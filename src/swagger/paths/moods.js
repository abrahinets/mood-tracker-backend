export const moodsSwagger = {
    '/api/v1/moods': {
        get: {
            tags: ['Moods'],
            summary: 'Get all moods',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'offset',
                    in: 'query',
                    schema: {
                        type: 'integer',
                        default: 0,
                    },
                },
                {
                    name: 'limit',
                    in: 'query',
                    schema: {
                        type: 'integer',
                        default: 20,
                    },
                },
            ],
            responses: {
                200: {
                    description: 'List of moods',
                },
                401: {
                    description: 'Unauthorized',
                },
            },
        },
        post: {
            tags: ['Moods'],
            summary: 'Create mood',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['mood'],
                            properties: {
                                mood: {
                                    type: 'string',
                                },
                                note: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Mood created',
                },
                400: {
                    description: 'Validation error',
                },
                401: {
                    description: 'Unauthorized',
                },
            },
        },
    },

    '/api/v1/moods/{id}': {
        get: {
            tags: ['Moods'],
            summary: 'Get mood by id',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                },
            ],
            responses: {
                200: {
                    description: 'Mood data',
                },
                404: {
                    description: 'Mood not found',
                },
                401: {
                    description: 'Unauthorized',
                },
            },
        },
        put: {
            tags: ['Moods'],
            summary: 'Update mood',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                },
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                mood: {
                                    type: 'string',
                                },
                                note: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Mood updated',
                },
                400: {
                    description: 'Validation error',
                },
                404: {
                    description: 'Mood not found',
                },
                401: {
                    description: 'Unauthorized',
                },
            },
        },
        delete: {
            tags: ['Moods'],
            summary: 'Delete mood',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                },
            ],
            responses: {
                200: {
                    description: 'Mood deleted',
                },
                404: {
                    description: 'Mood not found',
                },
                401: {
                    description: 'Unauthorized',
                },
            },
        },
    },
};
