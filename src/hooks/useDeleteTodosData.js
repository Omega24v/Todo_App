import { useState } from "react";
import { API_BASE_URL } from "../api";

export const useDeleteTodosFromData = (refreshTodos) => {
	const [isTodoDelete, setIsDelete] = useState(false);

	const deleteTodoFromData = (todoId) => {
		const db = `${API_BASE_URL}/todos/${todoId}`;

		setIsDelete(true);

		fetch(db, {
			method: "DELETE",
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Ошибка, такой задачи не существует!");
				}

				refreshTodos();
			})
			.catch((error) => console.log(error))
			.finally(() => setIsDelete(false));
	};

	return {
		isTodoDelete,
		deleteTodoFromData,
	};
};
