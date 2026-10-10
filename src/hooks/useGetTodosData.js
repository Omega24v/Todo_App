import { useEffect, useState } from "react";

export const useGetTodosData = () => {
	const [dataTodos, setDataTodos] = useState([]);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/todos")
			.then((response) => response.json())
			.then((todoData) => setDataTodos(todoData))
			.catch((error) => console.log(error));
	}, []);

	return {
		dataTodos,
		setDataTodos,
	};
};
