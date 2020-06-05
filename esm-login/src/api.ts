export function performLogin(username: string, password: string) {
  const token = window.btoa(`${username}:${password}`);
  return fetch(`/openmrs/ws/rest/v1/session`, {
    headers: {
      'content-type': 'application/json',
      authorization: `Basic ${token}`,
    },
  }).then((res) => res.json());
}

export function performLogout() {
  return fetch(`/openmrs/ws/rest/v1/session`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => res.text());
}

export function getCurrentUser() {
  return fetch(`/openmrs/ws/rest/v1/session`, {
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => res.json());
}
