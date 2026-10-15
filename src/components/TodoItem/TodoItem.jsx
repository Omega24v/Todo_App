import { Check, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import styles from "./TodoItem.module.css";

export const TodoItem = ({
	id,
	text,
	updateTodoData,
	isTodoUpdating,
	deleteTodoFromData,
	isTodoDelete,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedText, setEditedText] = useState("");

	const handleEditTodo = () => {
		if (!isEditing) {
			setEditedText(text);
			setIsEditing(true);
			return;
		}

		updateTodoData(id, editedText);
		setIsEditing(false);
	};

	return (
		<div className={styles.todo}>
			<input
				className={`
					${styles.todo_text}
					${isEditing ? styles['todo_text-active'] : ""}

					`}
				value={isEditing ? editedText : text}
				onChange={({ target }) => setEditedText(target.value)}
				disabled={!isEditing}
			/>
			<div className={styles.todo_actions}>
				<button
					className={`${styles.icon_button} ${styles.button_edit}`}
					aria-label="Редактировать задачу"
					title="Редактировать задачу"
					onClick={handleEditTodo}
					disabled={isTodoUpdating}
				>
					{isEditing ? (
						<Check size={18} aria-hidden="true" />
					) : (
						<Pencil size={18} aria-hidden="true" />
					)}
				</button>
				<button
					className={`${styles.icon_button} ${styles.button_delete}`}
					aria-label="Удалить задачу"
					title="Удалить задачу"
					onClick={() => deleteTodoFromData(id)}
					disabled={isTodoDelete}
				>
					<Trash2 size={18} aria-hidden="true" />
				</button>
			</div>
		</div>
	);
};
