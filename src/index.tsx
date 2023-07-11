import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Presentation/App";
import MainLayout from "./Presentation/Layouts/MainLayout";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { Provider } from "react-redux";
import { store } from "./Domain/Store/store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import requestPermissionNotification from "./firebase-getToken";

import "./tailwind.css";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Web Untuk Membantu Mahasiswa UIN Jakarta Dalam Mencari Barang Yang Hilang"
        />
      </Helmet>
      <Provider store={store}>
        <MainLayout>
          <App />
        </MainLayout>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

// register service worker firebase cloud messaging
requestPermissionNotification();

// register service worker global scope
if (process.env.NODE_ENV === "production") {
  // serviceWorkerRegistration.register();
} else {
  serviceWorkerRegistration.localServiceWorkerRegister();
}
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
