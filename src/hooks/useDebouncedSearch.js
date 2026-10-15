import { useMemo } from "react";
import { debounce } from "../utils";

export const useDebouncedSearch = (setSearchQuery, delay = 400) => {
	return useMemo(
		() => debounce(setSearchQuery, delay),
		[setSearchQuery, delay],
	);
};
