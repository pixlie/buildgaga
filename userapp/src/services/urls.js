// Use this env var to point to the backend API for postbuild
const host = process.env.REACT_APP_API_HOST || '';

export const apiRoot = `${host}/api`;

export const categoryURL = `${apiRoot}/category`;
export const solutionURL = `${apiRoot}/solution`;
export const categorySolutionURL = `${apiRoot}/category_solution`;