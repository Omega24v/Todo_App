import styles from "./TodoHeader.module.css";

export const TodoHeader = ({ dataTodos }) => {
	return (
		<header className={styles.panel_header}>
			<div>
				<p className={styles.eyebrow}>ПЛАН НА СЕГОДНЯ</p>
				<h1 className={styles.panel_title}>Мои задачи</h1>
			</div>
			<p className={styles.todo_count}>
				<span>{dataTodos.length}</span> задач в списке
			</p>
		</header>
	);
};
