const contentful = require('contentful');

exports.handler = async function(event, context) {
    const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, NOVEDADES_CONTENT_TYPE_ID } = process.env;

    const client = contentful.createClient({
        space: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
    });

    try {
        const entries = await client.getEntries({
            content_type: NOVEDADES_CONTENT_TYPE_ID,
            order: '-fields.fecha',
            limit: 6
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
