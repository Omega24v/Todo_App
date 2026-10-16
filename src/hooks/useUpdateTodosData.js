import { useState } from "react";
import { ref, update } from "firebase/database";
import { db } from "../firebase";

export const useUpdateTodosData = (
	setSearchInput,
	setSearchQuery,
) => {
	const [isTodoUpdating, setIsTodoUpdating] = useState(false);

	const updateTodoData = (todoId, todoText) => {
		const todoTextTrim = todoText.trim();

		if (!todoTextTrim) {
			return;
		}
		setIsTodoUpdating(true);

		const todoDbRef = ref(db, `todos/${todoId}`);

		update(todoDbRef, {
			text: todoTextTrim,
		})
			.then(() => {
				setSearchInput("");
				setSearchQuery("");
			})
			.catch((error) => console.log(error))
			.finally(() => setIsTodoUpdating(false));
	};

	return {
		isTodoUpdating,
		updateTodoData,
	};
};
