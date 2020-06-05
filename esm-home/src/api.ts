export function performPatientSearch(query: string, objectVersion: string) {
  return fetch(`/openmrs/ws/rest/v1/patient?q=${query}&v=${objectVersion}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
}
