// src/services/nocodb.js

// Endpoint oficial de NocoDB Cloud (API v2) utilizando el Table ID 'mx7fmn1b5e21rer'
const API_URL = 'https://app.nocodb.com/api/v2/tables/mx7fmn1b5e21rer/records';
const API_TOKEN = import.meta.env.VITE_NOCODB_TOKEN || 'nc_pat_kevmXQ1PARW7ycPjQh7VZa4vhrTAlf4vS2JKKBnL';

/**
 * Registra el progreso o respuesta de un estudiante en NocoDB Cloud.
 * @param {Object} datosEstudiante Objeto con nombre y reflexión
 */
export async function guardarEvaluacionEstudiante(datosEstudiante) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xc-token': API_TOKEN,
      },
      body: JSON.stringify(datosEstudiante),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error HTTP: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Fallo en la persistencia con NocoDB:', error);
    return { success: false, error: error.message };
  } finally {
    console.log('Operación de persistencia asincrónica finalizada.');
  }
}