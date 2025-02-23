import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

// setup 外部使用需要下面的代码实现provide
// const apolloClient = createApolloClient(GRAPHQL_URI);
// provideApolloClient(apolloClient);

// 使用闭包可以避免非Vue setup无法使用provide的问题
export function useUserQuery(variables: { id: string }) {
  const query = gql`
    query user($id: ID!) {
      user(id: $id) {
        id
        name
      }
    }`;

  const { result, loading, error, refetch } = useQuery<{ id: string, name: string }, { id: string }>(query, variables);

  return {
    result,
    loading,
    error,
    refetch,
  };
}
