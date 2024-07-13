import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
	uri: "http://localhost:8000/subgraphs/name/architect",
	cache: new InMemoryCache(),
});
