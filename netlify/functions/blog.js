// VERSIÓN DE DEPURACIÓN DE: netlify/functions/blog.js

const contentful = require('contentful');

exports.handler = async function(event, context) {
    const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, BLOG_CONTENT_TYPE_ID } = process.env;

    // 1. Verifiquemos si las variables de entorno están llegando
    if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN || !BLOG_CONTENT_TYPE_ID) {
        const missingVars = [];
        if (!CONTENTFUL_SPACE_ID) missingVars.push("CONTENTFUL_SPACE_ID");
        if (!CONTENTFUL_ACCESS_TOKEN) missingVars.push("CONTENTFUL_ACCESS_TOKEN");
        if (!BLOG_CONTENT_TYPE_ID) missingVars.push("BLOG_CONTENT_TYPE_ID");
        
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                message: "Error Crítico: Faltan variables de entorno en Netlify.",
                missing: missingVars 
            })
        };
    }

    try {
        // 2. Intentemos conectar con Contentful
        const client = contentful.createClient({
            space: CONTENTFUL_SPACE_ID,
            accessToken: CONTENTFUL_ACCESS_TOKEN,
        });

        // 3. Intentemos obtener las entradas
        const entries = await client.getEntries({
            content_type: BLOG_CONTENT_TYPE_ID
        });

        // 4. Si todo va bien, devolvemos los datos
        return {
            statusCode: 200,
            body: JSON.stringify(entries)
        };

    } catch (error) {
        // 5. ¡AQUÍ ESTÁ LA MAGIA! Si algo falla, capturamos el error
        // y lo enviamos como respuesta para poder verlo en el navegador.
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "La función de Netlify falló. Detalles del error:",
                error_name: error.name,
                error_message: error.message,
                error_details: error.details // Esto es oro puro si el error es de Contentful
            })
        };
    }
};
