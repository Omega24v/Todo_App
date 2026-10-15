import styles from "./SortTodoButton.module.css";
import { ArrowDownAZ } from "lucide-react";

export const SortTodoButton = ({ isSorted, handleSortToggle }) => {
	return (
		<>
			<button
				className={`${styles.sort_button} ${isSorted ? styles.sort_active : ""}`}
				type="button"
				aria-pressed={isSorted}
				onClick={handleSortToggle}
			>
				<ArrowDownAZ size={18} aria-hidden="true" />
				Сортировка А—Я
			</button>
		</>
	);
};
