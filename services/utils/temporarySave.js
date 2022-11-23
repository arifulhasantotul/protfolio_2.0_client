const saveToLocalStorage = (keyName = "", objName = {}) => {
  localStorage.setItem(keyName, JSON.stringify(objName));
};

const saveToSessionStorage = (keyName = "", objName = {}) => {
  sessionStorage.setItem(keyName, JSON.stringify(objName));
};

export { saveToLocalStorage, saveToSessionStorage };
