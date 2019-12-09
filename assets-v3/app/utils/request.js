import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const instance = axios.create({
  baseURL: 'https://api-dev.leadbook.com/api/v1/prospects/',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': cookies.get('csrftoken'),
    'Authorization':'Token caadae99a4c68fdc4612774484ce33d523f9973d'
  },
});

export function getRequest(url) {
  return instance.get(url)
    .then(parseJSON)
    .catch(handleError);
}

export function postRequest(url, body) {
  return instance.post(url, body)
    .then(parseJSON)
    .catch(handleError);
}

export function putRequest(url, body) {
  return instance.put(url, body)
    .then(parseJSON)
    .catch(handleError);
}

export function deleteRequest(url) {
  return instance.delete(url)
    .then(parseJSON)
    .catch(handleError);
}

function parseJSON(response) {
  return response;
}

function handleError(response) {
  let err = JSON.stringify(response);
  err = JSON.parse(err);

  throw err.response;
}
