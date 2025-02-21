import { ApolloClient, ApolloLink, createHttpLink, from, InMemoryCache } from "@apollo/client/core";

export function createApolloClient(uri: string) {
  const httpLink = createHttpLink({
    uri,
    headers: {
      Authorization: "Bearer x'x'xxxx",
    },
  });

  // const authMiddleware = new ApolloLink((operation, forward) => {
  //   operation.setContext({
  //     headers: {
  //       Authorization: "Bearer 1234",
  //     },
  //   });
  //   return forward(operation);
  // });

  const requestLink = new ApolloLink((operation, forward) => {
    // 请求参数
    console.warn(operation.variables);
    return forward(operation);
  });

  const responseLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      console.warn("response", response.data);
      if (response.data) {
        response.data.user.name = "name";
      }
      return response;
    });
  });

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    // link: concat(authMiddleware, httpLink),
    // link: httpLink,
    link: responseLink.concat(from([requestLink, httpLink])),
    cache,
  });
  return client;
}
