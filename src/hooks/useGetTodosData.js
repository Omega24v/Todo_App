import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";

export const useGetTodosData = (refreshTodosFlag) => {
	const [dataTodos, setDataTodos] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const db = `${API_BASE_URL}/todos`;

	useEffect(() => {
		fetch(db)
			.then((response) => response.json())
			.then((todoData) => setDataTodos(todoData))
			.catch((error) => console.log(error))
			.finally(() => setIsLoaded(true));
	}, [db, refreshTodosFlag]);

	return {
		isLoaded,
		dataTodos,
	};
};
