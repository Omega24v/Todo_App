import { useState } from "react";
import { API_BASE_URL } from "../api";

export const useDeleteTodosFromData = (refreshTodos) => {
	const [isTodoDelete, setIsDelete] = useState(false);

	const deleteTodoFromData = (id) => {
		const db = `${API_BASE_URL}/todos/${id}`;

		setIsDelete(true);

		fetch(db, {
			method: "DELETE",
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Ошибка сервера: ${response.status}`);
				}
				refreshTodos();
			})
			.finally(() => setIsDelete(false));
	};

	return {
		isTodoDelete,
		deleteTodoFromData,
	};
};
