// --- NOVEDADES SCRIPT ---
async function fetchNovedades() {
    const novedadesGrid = document.getElementById('novedades-grid');
    // Si el contenedor de novedades no existe en la página actual, no hagas nada.
    if (!novedadesGrid) return;

    try {
        const response = await fetch(`/.netlify/functions/novedades`);
        if (!response.ok) throw new Error('La respuesta de la red no fue correcta');
        
        const data = await response.json();
        const assets = new Map(data.includes.Asset.map(asset => [asset.sys.id, asset.fields]));
        const novedades = data.items.map(item => ({ id: item.sys.id, ...item.fields, imageUrl: assets.get(item.fields.imagenPrincipal.sys.id)?.file.url }));

        novedadesGrid.innerHTML = ''; 

        if (novedades.length === 0) {
            novedadesGrid.innerHTML = '<p class="text-center col-span-full text-gray-600">No hay novedades por el momento. ¡Vuelve pronto!</p>';
            return;
        }

        novedades.forEach(novedad => {
            const article = document.createElement('article');
            article.className = 'custom-card'; // Usa tus clases de CSS
            const formattedDate = new Date(novedad.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

            // Este es tu código HTML para las tarjetas de novedades, ajústalo si es necesario
            article.innerHTML = `
                <div class="relative h-56 overflow-hidden">
                    <img src="https:${novedad.imageUrl}" alt="${novedad.titulo}" class="w-full h-full object-cover">
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-bold">${novedad.titulo}</h3>
                    <p class="text-sm text-gray-500 mb-2">${formattedDate}</p>
                    <a href="#" class="text-blue-600 hover:underline">Leer más</a>
                </div>
            `;
            novedadesGrid.appendChild(article );
        });

    } catch (error) {
        console.error('Error al cargar las novedades:', error);
        novedadesGrid.innerHTML = '<p class="text-center col-span-full text-red-600">No se pudieron cargar las novedades.</p>';
    }
}


// --- BLOG SCRIPT (NUEVO) ---
async function fetchBlogPosts() {
    const blogContainer = document.getElementById('blog-posts-container');
    // Si el contenedor del blog no existe en la página actual, no hagas nada.
    if (!blogContainer) return;

    blogContainer.innerHTML = '<p>Cargando entradas del blog...</p>';

    try {
        // Llamamos a la nueva función de Netlify que creamos
        const response = await fetch(`/.netlify/functions/blog`);
        if (!response.ok) throw new Error('La respuesta del servidor no fue correcta');

        const data = await response.json();
        // El siguiente código es un ejemplo. Tienes que adaptarlo a los nombres de tus campos en Contentful (ej. 'titulo', 'resumen', 'imagenPost')
        const assets = new Map(data.includes.Asset.map(asset => [asset.sys.id, asset.fields]));
        const posts = data.items.map(item => ({ id: item.sys.id, ...item.fields, imageUrl: assets.get(item.fields.imagenPost?.sys.id)?.file.url }));

        blogContainer.innerHTML = '';

        if (posts.length === 0) {
            blogContainer.innerHTML = '<p class="text-center col-span-full text-gray-600">No hay entradas en el blog por el momento.</p>';
            return;
        }

        posts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'custom-card'; // Reutiliza tus estilos
            const formattedDate = new Date(post.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

            article.innerHTML = `
                <div class="relative h-56 overflow-hidden">
                    <img src="${post.imageUrl ? `https:${post.imageUrl}` : 'https://via.placeholder.com/400x224.png?text=Sin+Imagen'}" alt="${post.titulo}" class="w-full h-full object-cover">
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-bold">${post.titulo}</h3>
                    <p class="text-sm text-gray-500 mb-2">${formattedDate}</p>
                    <p class="text-gray-700 mb-4">${post.resumen || ''}</p>
                    <a href="entrada-blog.html?id=${post.id}" class="text-blue-600 hover:underline">Leer más</a>
                </div>
            `;
            blogContainer.appendChild(article );
        });

    } catch (error) {
        console.error('Error al cargar las entradas del blog:', error);
        blogContainer.innerHTML = '<p class="text-center col-span-full text-red-600">No se pudieron cargar las entradas del blog.</p>';
    }
}


// --- LLAMADAS INICIALES ---
// Cuando el contenido de la página esté cargado, ejecuta ambas funciones.
// Cada función se encargará de verificar si está en la página correcta.
document.addEventListener('DOMContentLoaded', () => {
    fetchNovedades();
    fetchBlogPosts();
});
// ====================================================================
//  SCRIPT COMBINADO PARA NOVEDADES Y BLOG
// ====================================================================


// --- FUNCIÓN PARA CARGAR NOVEDADES ---
async function fetchNovedades() {
    const novedadesGrid = document.getElementById('novedades-grid');
    // Si no estamos en la página de novedades, no hagas nada.
    if (!novedadesGrid) return;

    try {
        const response = await fetch(`/.netlify/functions/novedades`);
        if (!response.ok) throw new Error('La respuesta de la red no fue correcta');
        
        const data = await response.json();
        const assets = new Map(data.includes.Asset.map(asset => [asset.sys.id, asset.fields]));
        const novedades = data.items.map(item => ({ id: item.sys.id, ...item.fields, imageUrl: assets.get(item.fields.imagenPrincipal.sys.id)?.file.url }));

        novedadesGrid.innerHTML = ''; 

        if (novedades.length === 0) {
            novedadesGrid.innerHTML = '<p class="text-center col-span-full text-gray-600">No hay novedades por el momento. ¡Vuelve pronto!</p>';
            return;
        }

        novedades.forEach(novedad => {
            const article = document.createElement('article');
            article.className = 'custom-card';
            const formattedDate = new Date(novedad.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

            // Tu código HTML para las tarjetas de novedades
            article.innerHTML = `
                <div class="relative h-56 overflow-hidden">
                    <img src="https:${novedad.imageUrl}" alt="${novedad.titulo}" class="w-full h-full object-cover">
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-bold">${novedad.titulo}</h3>
                    <p class="text-sm text-gray-500 mb-2">${formattedDate}</p>
                    <!-- Puedes añadir más detalles o un enlace si lo necesitas -->
                </div>
            `;
            novedadesGrid.appendChild(article );
        });

    } catch (error) {
        console.error('Error al cargar las novedades:', error);
        novedadesGrid.innerHTML = '<p class="text-center col-span-full text-red-600">No se pudieron cargar las novedades.</p>';
    }
}


// --- FUNCIÓN PARA CARGAR ENTRADAS DEL BLOG (NUEVA) ---
async function fetchBlogPosts() {
    const blogContainer = document.getElementById('blog-posts-container');
    // Si no estamos en la página del blog, no hagas nada.
    if (!blogContainer) return;

    blogContainer.innerHTML = '<p>Cargando entradas del blog...</p>';

    try {
        const response = await fetch(`/.netlify/functions/blog`);
        if (!response.ok) throw new Error('La respuesta del servidor no fue correcta');

        const data = await response.json();
        // ADAPTA LOS NOMBRES DE LOS CAMPOS a los de tu modelo de contenido del blog en Contentful
        const assets = new Map(data.includes.Asset.map(asset => [asset.sys.id, asset.fields]));
        const posts = data.items.map(item => ({ id: item.sys.id, ...item.fields, imageUrl: assets.get(item.fields.imagenPost?.sys.id)?.file.url })); // ej: 'imagenPost'

        blogContainer.innerHTML = '';

        if (posts.length === 0) {
            blogContainer.innerHTML = '<p class="text-center col-span-full text-gray-600">No hay entradas en el blog por el momento.</p>';
            return;
        }

        posts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'custom-card'; // Reutiliza tus estilos
            const formattedDate = new Date(post.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

            // Este HTML es un ejemplo, ajústalo a tus necesidades
            article.innerHTML = `
                <div class="relative h-56 overflow-hidden">
                    <img src="${post.imageUrl ? `https:${post.imageUrl}` : 'https://via.placeholder.com/400x224.png?text=Sin+Imagen'}" alt="${post.titulo}" class="w-full h-full object-cover">
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-bold">${post.titulo}</h3>
                    <p class="text-sm text-gray-500 mb-2">${formattedDate}</p>
                    <p class="text-gray-700 mb-4">${post.resumen || ''}</p>
                    <a href="entrada-blog.html?id=${post.id}" class="text-blue-600 hover:underline">Leer más</a>
                </div>
            `;
            blogContainer.appendChild(article );
        });

    } catch (error) {
        console.error('Error al cargar las entradas del blog:', error);
        blogContainer.innerHTML = '<p class="text-center col-span-full text-red-600">No se pudieron cargar las entradas del blog.</p>';
    }
}


// --- INICIALIZADOR ---
// Se ejecuta una vez que el HTML de la página ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llama a ambas funciones. Cada una sabrá si debe ejecutarse o no.
    fetchNovedades();
    fetchBlogPosts();
});
