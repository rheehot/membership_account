const postData = async (url = '', data = {}) => {
  const options = {
    method: 'POST',
    cache: 'no-cache',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  return response;
};

const deleteData = async (url = '') => {
  const options = {
    method: 'DELETE',
    cache: 'no-cache',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url, options);
  return response;
};

const getData = async (url = '') => {
  const options = {
    method: 'GET',
    cache: 'no-cache',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url, options).then((res) => res.json());
  return response;
};

export { postData, deleteData, getData };
