export const BASE_URL = 'http://api.exir74.nomoredomains.xyz'
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
    .then((data)=>{
      if(data._id) {
        return data
      }
      return  null
    })
    // .then((data) => {
    //   if (data.token) {
    //     localStorage.setItem('token', data.token);
    //     return data;
    //   }
    // })
    .catch(err => console.log(err))
}

export const checkToken = ()=>{
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    })
    .then(res=> res.json())
    //.then(data=> data)

}


