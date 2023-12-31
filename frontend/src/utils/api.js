class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInformation() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        //authorization: this.headers.authorization,
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        //authorization: this.headers.authorization,
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data)=>{
       return data
      })
  }

  setUserInformation(name, subtitle) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        //authorization: this.headers.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: subtitle,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  addUserCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
       // authorization: this.headers.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  deleteUserCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  setLike(cardId) {
    return fetch(this.baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  changeLikeCardStatus(cardId,isLiked) {
    if (isLiked){
      return fetch(this.baseUrl + '/cards/' + cardId + '/likes', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          authorization: this.headers.authorization,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          return this._getResponseData(res);
        })
    }else {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          authorization: this.headers.authorization,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          return this._getResponseData(res);
        })
    }
  }

  setUserAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  logoutUser(){
    return fetch(`${this.baseUrl}/signout`,{
      method: 'GET',
      credentials: 'include',
      headers:{
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }
}

export const api = new Api({
  baseUrl: 'https://api.exir74.nomoredomains.xyz',
  headers: {
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
    // authorization: '70f54093-bc83-47bc-b65d-881ab4394db0',
  },
});