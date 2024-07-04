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
	logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
	account: undefined,
	isAuthenticated: false,
	login: () => {},
	logout: () => {},
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
	const { authenticated, user, login, ready, logout } = usePrivy();

	const value = useMemo(
		() => ({
			account: user?.id ? { address: user.id } : undefined,
			isAuthenticated: authenticated,
			login,
			logout,
		}),
		[user, ready],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
