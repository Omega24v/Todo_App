import { useState } from "react";
import { API_BASE_URL } from "../api";

export const useUpdateTodosData = (refreshTodos) => {
	const [isTodoUpdating, setIsTodoUpdating] = useState(false);

	const updateTodoData = (todoId, todoText) => {
		const db = `${API_BASE_URL}/todos/${todoId}`;

		const todoTextTrim = todoText.trim();

		if (!todoTextTrim) {
			return;
		}

		setIsTodoUpdating(true);

		return fetch(db, {
			method: "PUT",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				text: todoTextTrim,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Ошибка сервера: ${response.status}`);
				}

				return response.json();
			})
			.then((updatedTodo) => {
				console.log("Ответ от сервера: Задание обновлено", updatedTodo);
				refreshTodos();
				return updatedTodo;
			})
			.finally(() => setIsTodoUpdating(false));
	};

	return {
		isTodoUpdating,
		updateTodoData,
	};
};
