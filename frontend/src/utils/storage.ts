import { Token } from '../types';

const storageKey = 'logged-link-User'

const saveUser = (user: Token) => {
  localStorage.setItem(storageKey, JSON.stringify(user))
}

const isLoggedIn = () => localStorage.getItem(storageKey) !== null;

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const loadUser = () => {
  const key = localStorage.getItem(storageKey);
  if(key && isString(key))
    return JSON.parse(key);
  else 
    return null;
}

const logoutUser = () =>
  localStorage.removeItem(storageKey)

export default {
  saveUser,
  loadUser,
  logoutUser,
  isLoggedIn
}