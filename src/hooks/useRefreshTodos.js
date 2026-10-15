import { useState } from "react";

export const useRefreshTodos = () => {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);

	const refreshTodos = () => {
		setRefreshTodosFlag((flag) => !flag);
	};

	return {
		refreshTodos,
		refreshTodosFlag,
	};
};
