export const sortTodos = (todos, isSorted) =>
	isSorted
		? [...todos].sort((a, b) => a.text.localeCompare(b.text, "ru"))
		: todos;
