import { useUserDB } from "@/database/hooks";
import type { User } from "@/database/type";
import { createContext, useContext, useEffect, useState } from "react";

// Create User Context Type
type UserContextType = {
	user?: User;
	setUser: (user: User | undefined) => void;
	init: boolean;
};

// Create User Context
const UserContext = createContext<UserContextType>({
	setUser: () => {},
	init: false,
});

// Create User Hook
export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserContext must be used within a UserProvider");
	}
	return context;
};

// Create User Provider Type
type UserProviderType = {
	children: React.ReactNode;
};

// Create User Provider
export const UserProvider = ({ children }: UserProviderType) => {
	const [user, setUser] = useState<User | undefined>();
	const [init, setInit] = useState(false);

	const { fetchUser } = useUserDB();

	useEffect(() => {
		fetchUser().then((result) => {
			if (result[0]) {
				setUser(result[0]);
			} else {
				setUser(undefined);
			}
			setInit(true);
		});
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser, init }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
