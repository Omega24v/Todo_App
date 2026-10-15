export const filterTodos = (todos, searchQuery) => {
	return todos.filter((todo) => {
		return todo.text
			?.toLowerCase()
			.includes(searchQuery.trim().toLowerCase());
	});
};
