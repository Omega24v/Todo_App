import { Navigate, Route, Routes } from "react-router";
import { HomePage, NotFoundPage, TaskPage } from "./pages";

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/task/:id" element={<TaskPage />} />
			<Route path="/404" element={<NotFoundPage />} />
			<Route path="*" element={<Navigate to="/404" replace />} />
		</Routes>
	);
};
