import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";

import buildClient from "../api/build-client";
import Header from "../components/Header";
import store from "../configStore";
import "./styles.css";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <Provider store={store}>
      <Header currentUser={currentUser} />
      <Component currentUser={currentUser} {...pageProps} />
    </Provider>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps;
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }
  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
