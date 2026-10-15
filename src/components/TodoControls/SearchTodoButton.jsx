import styles from "./SearchTodoButton.module.css";

export const SearchTodoButton = ({ addTodoData, isTodoCreating }) => {
	return (
		<button
			className={styles.button}
			onClick={addTodoData}
			disabled={isTodoCreating}
		>
			Добавить
		</button>
	);
};
