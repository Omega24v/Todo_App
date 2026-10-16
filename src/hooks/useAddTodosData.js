import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";

export const useAddTodosData = (
	searchInput,
	setSearchInput,
	setSearchQuery,
) => {
	const [isTodoCreating, setIsTodoCreating] = useState(false);

	const addTodoData = () => {
		const searchInputTrim = searchInput.trim();

		if (!searchInputTrim) {
			return;
		}

		setIsTodoCreating(true);
		const todoDbRef = ref(db, "todos");

		push(todoDbRef, {
			text: searchInputTrim,
		})
			.then((answer) => {
				console.log("Ответ от сервера: Задание добавлено", answer);
				setSearchInput("");
				setSearchQuery("");
			})
			.catch((error) => console.log(error))
			.finally(() => setIsTodoCreating(false));
	};

	return {
		isTodoCreating,
		addTodoData,
	};
};
