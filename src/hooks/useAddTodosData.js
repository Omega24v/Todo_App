import { useState } from "react";
import { API_BASE_URL } from "../api";
import { isSearchInputEmpty } from "../utils";

export const useAddTodosData = (
	refreshTodos,
	searchInput,
	setSearchInput,
	setSearchQuery,
) => {
	const [isTodoCreating, setIsTodoCreating] = useState(false);
	const isAddTodoDisabled = isSearchInputEmpty(searchInput);

	const addTodoData = () => {
		let searchInputTrim = searchInput.trim();

		if (!searchInputTrim) {
			return;
		}

		const db = `${API_BASE_URL}/todos`;

		setIsTodoCreating(true);

		fetch(db, {
			method: "POST",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({ text: searchInputTrim }),
		})
			.then((response) => response.json())
			.then((answer) => {
				console.log("Ответ от сервера: Задание добавлено", answer);
				setSearchInput("");
				setSearchQuery("");
				refreshTodos();
			})
			.catch((error) => console.log(error))
			.finally(() => setIsTodoCreating(false));
	};

	return {
		isTodoCreating,
		isAddTodoDisabled,
		addTodoData,
	};
};
