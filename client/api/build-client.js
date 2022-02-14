import axios from "axios";

export default ({ req }) => {
  // GetInitialProps will run conditionally
  // on first time on browser it runs with base url but
  // on direct link, from another domain or hard refress
  // it runs with an error because of different namespace of services.
  if (typeof window === "undefined") {
    //We are on server!
    //Requests should be made to http://ingress-nginx-controller.ingress-nginx.scv.cluster.local
    //Format of link during cross namespace communication is
    //http://SERVICENAME.NAMESPACE.svc.cluster.local/{route}
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // We are on the browser.
    // Requests should be made with a base url of ''
    return axios.create({
      baseURL: "/",
    });
  }
};
