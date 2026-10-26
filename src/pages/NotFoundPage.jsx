import { Link } from "react-router"

export const NotFoundPage = () => {
	return (
		<>
			<title>Страница не найдена - Todo App</title>
			<h1>Страница не найдена. Попробуйте ещё раз.</h1>
			<Link to={'/'}>Вернуться на главную</Link>
		</>
	)
}
