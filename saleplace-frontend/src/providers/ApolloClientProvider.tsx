'use client';
import type { PropsWithChildren } from "react";
import { client } from "../libs/apollo-client";
import { ApolloProvider } from "@apollo/client/react";



export function ApolloClientProvider({ children }: PropsWithChildren<unknown>) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}