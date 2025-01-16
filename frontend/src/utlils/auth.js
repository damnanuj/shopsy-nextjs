//>>====== savetoken to localStorage==============>>
export const saveToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt_token", token);
  }
};

//>>====== fetch token==============>>
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("jwt_token");
  }
  return null;
};

//>>======token remove==============>>
export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt_token");
  }
};
