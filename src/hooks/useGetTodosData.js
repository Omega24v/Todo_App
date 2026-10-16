import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase";

export const useGetTodosData = () => {
	const [dataTodos, setDataTodos] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const todoDbRef = ref(db, "todos");

		return onValue(todoDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || {};
			const todosArray = Object.entries(loadedTodos).map(
				([id, todo]) => ({
					...todo,
					id
				}),
			);

			setDataTodos(todosArray);
			setIsLoaded(true);
		});
	}, []);

	return {
		isLoaded,
		dataTodos,
	};
};
