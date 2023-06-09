class CheckSupportedBrowser {
  public static serviceWorker() {
    if (!("serviceWorker" in navigator)) {
      console.log(
        "Service Worker isn't supported on this browser, disable or hide UI."
      );
      return false;
    }

    return true;
  }
  public static pushManager() {
    if (!("PushManager" in window)) {
      console.log("Push isn't supported on this browser, disable or hide UI.");
      return false;
    }

    return true;
  }
}

export default CheckSupportedBrowser;
