const storage = require('node-sessionstorage')

export function setItem(key, value) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, value)
  } else {
    storage.setItem(key, value)
  }
}

export function getItem(key) {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key)
  }
  return storage.getItem(key)
}
