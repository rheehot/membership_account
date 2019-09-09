const parseURL = () => {
  const url = window.location.hash.slice(1).toLowerCase() || '/';
  const r = url.split('/');
  const request = r[1];
  return request;
};

export default parseURL;
