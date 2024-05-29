"use client";

import { AuthProvider } from "@/providers/AuthProvider";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThirdwebProvider } from "thirdweb/react";

type ProviderType = {
	children: React.ReactNode;
};

const queryClient = new QueryClient();

const Providers = ({ children }: ProviderType) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThirdwebProvider>
				<AuthProvider>{children}</AuthProvider>
			</ThirdwebProvider>
		</QueryClientProvider>
	);
};

export default Providers;
