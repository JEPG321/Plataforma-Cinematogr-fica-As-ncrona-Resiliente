import { moviesData } from "../app/data.js";
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
export async function fetchMovies() {
    await delay(650);
    return [...moviesData];
}
//# sourceMappingURL=movie.service.js.map