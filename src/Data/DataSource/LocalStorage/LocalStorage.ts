class LocalStorage {
  public static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static get(key: string) {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  public static remove(key: string) {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;
