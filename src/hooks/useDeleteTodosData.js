import { useState } from "react";
import { ref, remove } from "firebase/database";
import { db } from "../firebase";

export const useDeleteTodosFromData = () => {
	const [isTodoDelete, setIsDelete] = useState(false);

	const deleteTodoFromData = (todoId) => {
		setIsDelete(true);

		const todosDbRef = ref(db, `todos/${todoId}`);

		remove(todosDbRef)
			.catch((error) => console.log(error))
			.finally(() => setIsDelete(false));
	};

	return {
		isTodoDelete,
		deleteTodoFromData,
	};
};
