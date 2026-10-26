import {
	useAddTodosData,
	useDebouncedSearch,
	useGetTodosData,
	useRefreshTodos,
} from "../hooks";
import { useState } from "react";
import {
	SearchTodoInput,
	SortTodoButton,
	AddTodoButton,
	TodoHeader,
	TodoListItem,
} from "../components";
import { filterTodos, sortTodos } from "../utils";
import styles from "../App.module.css";

export const HomePage = () => {
	const [searchInput, setSearchInput] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [isSorted, setIsSorted] = useState(false);

	const { refreshTodosFlag, refreshTodos } = useRefreshTodos();

	const { isLoaded, dataTodos } = useGetTodosData(refreshTodosFlag);
	const { isTodoCreating, addTodoData, isAddTodoDisabled } = useAddTodosData(
		refreshTodos,
		searchInput,
		setSearchInput,
		setSearchQuery
	);

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
			<title>Главная - Todo App</title>

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

						<AddTodoButton
							addTodoData={addTodoData}
							isTodoCreating={isTodoCreating}
							searchInput={searchInput}
							isAddTodoDisabled={isAddTodoDisabled}
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
									<TodoListItem
										id={id}
										key={id}
										text={text.trim()}
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
