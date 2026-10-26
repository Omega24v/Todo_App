import styles from "./AddTodoButton.module.css";


export const AddTodoButton = ({ addTodoData, isTodoCreating, isAddTodoDisabled }) => {

	return (
		<button
			className={styles.button}
			onClick={addTodoData}
			disabled={isTodoCreating || isAddTodoDisabled}
		>
			Добавить
		</button>
	);
};
