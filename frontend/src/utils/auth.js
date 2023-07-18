export const BASE_URL = 'http://localhost:3000'
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
    .then((res) => {
      return res
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
    .then((res => (res.json())))
    .then((data) => {
      return data
      // if (data.token) {
      //   localStorage.setItem('token', data.token);
      //   return data;
      // }
    })
    .catch(err => console.log(err))
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
    .then(res=> res.json())
    .then(data=> data)

}


