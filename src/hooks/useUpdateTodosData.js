import { useState } from "react";
import { API_BASE_URL } from "../api";

export const useUpdateTodosData = (
	setSearchInput,
	setSearchQuery,
	refreshTodos,
) => {
	const [isTodoUpdating, setIsTodoUpdating] = useState(false);

	const updateTodoData = (todoId, todoText) => {
		const db = `${API_BASE_URL}/todos/${todoId}`;

		const todoTextTrim = todoText.trim();

		if (!todoTextTrim) {
			return;
		}

		setIsTodoUpdating(true);

		fetch(db, {
			method: "PUT",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				text: todoTextTrim,
			}),
		})
			.then((response) => response.json())
			.then((answer) => {
				console.log("Ответ от сервера: Задание обновлено", answer);
				setSearchInput("");
				setSearchQuery("");
				refreshTodos();
			})
			.catch((error) => console.log(error))
			.finally(() => setIsTodoUpdating(false));
	};

	return {
		isTodoUpdating,
		updateTodoData,
	};
};
