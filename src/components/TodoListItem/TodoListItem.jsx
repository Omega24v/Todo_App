// import { Check, Pencil, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router";
import styles from "../../App.module.css";

export const TodoListItem = ({ id, text }) => {
	const location = useLocation();
	const returnTo = location.pathname;

	return (
		<div className={styles.todo}>
			<Link
				to={`/task/${id}`}
				state={{ from: returnTo }}
				className={styles.todo_text}
			>
				{text}
			</Link>
		</div>
	);
};
