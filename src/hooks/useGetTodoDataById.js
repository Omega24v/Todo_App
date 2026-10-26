import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";

export const useGetTodoDataById = (id) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [currentTodo, setCurrentTodo] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');
	const [notFound, setNotFound] = useState(false);

	const db = `${API_BASE_URL}/todos/${id}`

	useEffect(() => {
		fetch(db)
			.then(response => {
				if (response.status === 404) {
					setNotFound(true);
					return null;
				}

				if (!response.ok) {
					throw new Error(`Ошибка сервера: ${response.status}`);
				}

				return response.json();
			})
			.then(todoData => todoData ? setCurrentTodo(todoData) : {})
			.catch(error => setErrorMessage(error.message))
			.finally(() => setIsLoaded(true));
	}, [db]);

	return {
		currentTodo,
		setCurrentTodo,
		isLoaded,
		errorMessage,
		notFound
	}
}
