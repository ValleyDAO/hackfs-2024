"use client";

import { usePrivy } from "@privy-io/react-auth";
import React, { ReactNode, createContext, useMemo, useContext } from "react";

type Account = {
	address: string;
};

export interface AuthContextProps {
	account?: Account;
	isAuthenticated: boolean;
	login: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
	account: undefined,
	isAuthenticated: false,
	login: () => {},
});

export const useAuth = (): AuthContextProps => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
};

type AuthProviderProps = {
	children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
	const { authenticated, user, login } = usePrivy();

	const value = useMemo(
		() => ({
			account: user?.id ? { address: user.id } : undefined,
			isAuthenticated: authenticated,
			login,
		}),
		[user],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
