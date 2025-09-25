// En tu archivo script.js
async function fetchNovedades() {
    const novedadesGrid = document.getElementById('novedades-grid');
    if (!novedadesGrid) return;

    try {
        // ✅ ¡Llamada segura a nuestra función de Netlify!
        const response = await fetch('/.netlify/functions/novedades'); 
        
        if (!response.ok) throw new Error('La respuesta del servidor no fue correcta');
        
        const data = await response.json();
        // ... el resto de tu código para mostrar las novedades sigue igual ...
        // ...
    } catch (error) {
        console.error('Error al cargar las novedades:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchNovedades);
