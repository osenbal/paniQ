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

export const setCookie = (name: string, value: string, expires: string) => {
  document.cookie = name + "=" + value + ";expires=" + expires + ";path=/";
};

export const deleteCookie = (name: string) => {
  // remove coookie and change expire to now
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
};

export const updateCookie = (name: string, value: string, expires: string) => {
  document.cookie = name + "=" + value + ";expires=" + expires + ";path=/";
};
