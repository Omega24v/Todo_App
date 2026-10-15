import {
	useAddTodosData,
	useDebouncedSearch,
	useDeleteTodosFromData,
	useGetTodosData,
	useRefreshTodos,
	useUpdateTodosData,
} from "./hooks";
import { useState } from "react";
import {
	SearchTodoInput,
	SortTodoButton,
	SearchTodoButton,
	TodoHeader,
} from "./components";
import { filterTodos, sortTodos } from "./utils";
import styles from "./App.module.css";
import { TodoItem } from "./components/TodoItem/TodoItem";

export const App = () => {
	const [searchInput, setSearchInput] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [isSorted, setIsSorted] = useState(false);

	const { refreshTodosFlag, refreshTodos } = useRefreshTodos();

	const { isLoaded, dataTodos } = useGetTodosData(refreshTodosFlag);
	const { isTodoCreating, addTodoData } = useAddTodosData(
		refreshTodos,
		searchInput,
		setSearchInput,
		setSearchQuery,
	);
	const { isTodoUpdating, updateTodoData } = useUpdateTodosData(
		setSearchInput,
		setSearchQuery,
		refreshTodos,
	);
	const { isTodoDelete, deleteTodoFromData } =
		useDeleteTodosFromData(refreshTodos);

	const handleSearchChange = ({ target }) => {
		const value = target.value;

		setSearchInput(value);
		debouncedSetSearchQuery(value);
	};

	const filteredTodos = filterTodos(dataTodos, searchQuery);
	const sortedTodos = sortTodos(filteredTodos, isSorted);
	const debouncedSetSearchQuery = useDebouncedSearch(setSearchQuery, 400);

	const handleSortToggle = () => {
		setIsSorted((sorted) => !sorted);
	};

	return (
		<div className={styles.app}>
			{!isLoaded ? (
				<div className={styles.loader}>
					<span></span>
					<p>Loading...</p>
				</div>
			) : (
				<section className={styles.todo_panel}>
					<TodoHeader dataTodos={dataTodos} />

					<div className={styles.todo_controls}>
						<SearchTodoInput
							searchQuery={searchInput}
							handleSearchChange={handleSearchChange}
						/>

						<SearchTodoButton
							addTodoData={addTodoData}
							isTodoCreating={isTodoCreating}
						/>
					</div>

					<div className={styles.todo_list}>
						{sortedTodos.length === 0 ? (
							<p className={styles.empty_state}>
								{dataTodos.length === 0
									? "Список пока пуст. Добавь первую задачу."
									: "По этому запросу ничего не найдено."}
							</p>
						) : (
							sortedTodos.map(({ id, text }) => {
								return (
									<TodoItem
										id={id}
										key={id}
										text={text.trim()}
										updateTodoData={updateTodoData}
										isTodoUpdating={isTodoUpdating}
										deleteTodoFromData={deleteTodoFromData}
										isTodoDelete={isTodoDelete}
									/>
								);
							})
						)}
					</div>

					<div className={styles.button_block}>
						<SortTodoButton
							isSorted={isSorted}
							setIsSorted={setIsSorted}
							handleSortToggle={handleSortToggle}
						/>
					</div>
				</section>
			)}
		</div>
	);
};
