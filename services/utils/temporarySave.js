const saveToLocalStorage = (keyName = "", objName = {}) => {
  if (keyName) localStorage.setItem(keyName, JSON.stringify(objName));
};

const saveToSessionStorage = (keyName = "", objName = {}) => {
  if (keyName) sessionStorage.setItem(keyName, JSON.stringify(objName));
};

const getFromStorage = (storage, keyName) => {
  if (storage && keyName) return JSON.parse(storage.getItem(keyName));
};

const removeFromLocalStorage = (keyName) => {
  if (keyName) localStorage.removeItem(keyName);
};

const removeFromSessionStorage = (keyName) => {
  if (keyName) sessionStorage.removeItem(keyName);
};

export {
  saveToLocalStorage,
  saveToSessionStorage,
  removeFromLocalStorage,
  removeFromSessionStorage,
  getFromStorage,
};
