import { moviesData } from "../data.js";
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
export async function fetchMovies() {
    await delay(650);
    return [...moviesData];
}
//# sourceMappingURL=movieService.js.map