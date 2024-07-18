import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  // Definir el cuerpo de la solicitud POST para simular la asignación de una definition list a un producto
  let payload = JSON.stringify({
    productId: 184697, // ID del producto
    properties: {
      name: 'TESTPERFORMANCE4', // Nombre de la definition list
      type: 'Enum', // Tipo de la definition list
      color: '#b6cfa4', // Color de la definition list
      priority: 0, // Prioridad de la definition list
      definitionListId: 1892, // ID de la definition list
      metadata: {}, // Metadatos de la definition list
    },
    tenant: 'qa-automation', // Parámetro de la solicitud
  });

  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Realizar la solicitud POST a la URL específica con el cuerpo y los parámetros definidos
  let res = http.post('https://modelling-staging.axa-rev-preprod-mpl-int.merlot.eu-central-1.aws.openpaas.axa-cloud.com/api/editor/2.0/products/184697/properties?tenant=qa-automation', payload, params);

  // Verificar que la asignación se realizó correctamente
  check(res, {
    'asignacion exitosa': (r) => r.status === 201,
  });

  // Esperar un breve período de tiempo entre las asignaciones
  sleep(1);
}