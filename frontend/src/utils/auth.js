export const BASE_URL = 'https://api.exir74.nomoredomains.xyz'

function getResponse(res) {
  if (!res.ok) {
    // return Promise.reject(`Ошибка: ${res.status}`);
    return Promise.reject(res);
  }
  return res.json();
}
export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
    .then((res)=>{
     return getResponse(res)
    })
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, body: JSON.stringify({
      password: password,
      email: email
    })
  })
    .then((res)=>{
      return getResponse(res)
    })
}

export const checkToken = (token)=>{
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    }
    })
    .then((res)=>{
      return getResponse(res)
    })

}


