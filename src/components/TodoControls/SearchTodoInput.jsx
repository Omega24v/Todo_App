import styles from "./SearchTodoInput.module.css";

export const SearchTodoInput = ({ searchQuery, handleSearchChange }) => {
	return (
		<>
			<input
				className={styles.search_input}
				aria-label="Поиск или текст новой задачи"
				placeholder="Найти или добавить задачу"
				value={searchQuery}
				onChange={handleSearchChange}
			/>
		</>
	);
};
