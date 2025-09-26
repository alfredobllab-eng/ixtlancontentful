// Contenido para: netlify/functions/blog.js

const contentful = require('contentful');

exports.handler = async function(event, context) {
    // Usaremos una NUEVA variable de entorno para el blog.
    // Es importante que la creemos después en Netlify.
    const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, BLOG_CONTENT_TYPE_ID } = process.env;

    // Verificación para asegurarnos de que las variables existen
    if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN || !BLOG_CONTENT_TYPE_ID) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Faltan variables de entorno de Contentful en la configuración de Netlify." })
        };
    }

    const client = contentful.createClient({
        space: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
    });

    try {
        // Esta es la única parte que cambia: pedimos el tipo de contenido del blog.
        const entries = await client.getEntries({
            content_type: BLOG_CONTENT_TYPE_ID, // Usamos la nueva variable
            order: '-fields.fecha' // Ordenamos por fecha, la más nueva primero
        });

        return {
            statusCode: 200,
            body: JSON.stringify(entries)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message })
        };
    }
};
