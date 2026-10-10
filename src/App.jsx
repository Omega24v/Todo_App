import styles from "./App.module.css";
import { useGetTodosData } from "./hooks/useGetTodosData";

export const App = () => {
	const { dataTodos } = useGetTodosData();

	return (
		<div className={styles.app}>
			{dataTodos.map(({ id, title }) => {
				return <div className={styles.todo} key={id}>
					{id}, {title}
				</div>;
			})}
		</div>
	);
};
