import {
	Link,
	Navigate,
	useLocation,
	useNavigate,
	useParams,
} from "react-router";
import { useState } from "react";
import { Check, Pencil, Trash2 } from "lucide-react";
import {
	useGetTodoDataById,
	useDeleteTodosFromData,
	useUpdateTodosData,
	useRefreshTodos,
} from "../hooks/";
import styles from "../App.module.css";
export const TaskPage = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedText, setEditedText] = useState("");

	const { id } = useParams();
	const { refreshTodos } = useRefreshTodos();
	const location = useLocation();
	const previousPage = location.state?.from || "/";

	const { currentTodo, setCurrentTodo, isLoaded, errorMessage, notFound } =
		useGetTodoDataById(id);
	const { isTodoDelete, deleteTodoFromData } =
		useDeleteTodosFromData(refreshTodos);
	const { isTodoUpdating, updateTodoData } = useUpdateTodosData(refreshTodos);

	const handleEditTodo = () => {
		if (!isEditing) {
			setEditedText(currentTodo.text);
			setIsEditing(true);
			return;
		}

		updateTodoData(id, editedText)
			.then((updatedTodo) => {
				setCurrentTodo(updatedTodo);
				setIsEditing(false);
			})
			.catch((error) => console.log(error.message));
	};

	const navigate = useNavigate();

	const handleDeleteCurrentTodo = async () => {
		try {
			await deleteTodoFromData(id);
			navigate("/");
		} catch (error) {
			console.log("Не удалось удалить задачу:", error);
		}
	};

	if (notFound) {
		return <Navigate to={"/404"} replace />;
	}

	if (errorMessage) {
		return <p>{errorMessage}</p>;
	}

	return (
		<main className={styles.task_page}>
			<title>Задача - Todo App</title>

			{!isLoaded ? (
				<div className={styles.loader}>
					<span></span>
					<p>Loading...</p>
				</div>
			) : (
				<>
					<div className={`${styles.app} ${styles.task_app}`}>
						<section className={styles.todo_panel}>
							<div className={styles.todo_detail_list}>
								<div className={`${styles.todo} ${styles.todo_detail}`}>
									{isEditing ? (
										<textarea
											className={styles.todo_detail_editor}
											value={editedText}
											onChange={({ target }) =>
												setEditedText(target.value)
											}
											aria-label="Текст задачи"
											autoFocus
										/>
									) : (
										<p className={styles.todo_detail_text}>
											{currentTodo.text}
										</p>
									)}
									<div className={styles.todo_actions}>
										<button
											className={`${styles.icon_button} ${styles.button_edit}`}
											aria-label="Редактировать задачу"
											title="Редактировать задачу"
											onClick={handleEditTodo}
											disabled={isTodoUpdating}
										>
											{isEditing ? (
												<Check
													size={18}
													aria-hidden="true"
												/>
											) : (
												<Pencil
													size={18}
													aria-hidden="true"
												/>
											)}
										</button>
										<button
											className={`${styles.icon_button} ${styles.button_delete}`}
											aria-label="Удалить задачу"
											title="Удалить задачу"
											onClick={handleDeleteCurrentTodo}
											disabled={isTodoDelete}
										>
											<Trash2
												size={18}
												aria-hidden="true"
											/>
										</button>
									</div>
								</div>
							</div>
						</section>
					</div>
					<Link to={previousPage} className={styles.home_link}>
						Вернуться на главную
					</Link>
				</>
			)}
		</main>
	);
};
