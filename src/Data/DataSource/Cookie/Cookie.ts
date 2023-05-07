export const getCookie = (name: string): string => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const setCookie = (name: string, value: string, expires: number) => {
  // const date = new Date();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const deleteCookie = (name: string) => {
  document.cookie = name + "=;" + -1 + ";path=/";
};

export const updateCookie = (name: string, value: string, expires: number) => {
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};
