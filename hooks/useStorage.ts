import { STORAGE_KEYS } from "@/storage/keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useStorage = () => {
	const store = (key: string, value: string) => {
		return AsyncStorage.setItem(key, value);
	};

	const retrieve = (key: string) => {
		return AsyncStorage.getItem(key);
	};

	return {
		store,
		retrieve,
	};
};

export const useUserSetup = () => {
	const [loading, setLoading] = useState(false);
	const { store, retrieve } = useStorage();
	const [hasSetup, setHasSetup] = useState(false);

	useEffect(() => {
		const checkSetup = async () => {
			setLoading(true);
			const hasSetup = await retrieve(STORAGE_KEYS.HAS_SETUP);
			setHasSetup(hasSetup === "true");
			setLoading(false);
		};
		checkSetup();
	}, []);

	const completeSetup = async () => {
		// if hasnt setup, set hasSetup to true
		if (!hasSetup) {
			await store(STORAGE_KEYS.HAS_SETUP, "true");
			setHasSetup(true);
		}
	};

	return {
		hasSetup,
		completeSetup,
		loading,
	};
};
