import auth from "./auth";
import users from "./users";
import produits from "./produits";
import error from "./error";
import categories from "./categories";

export default () => ({
    auth,
    users,
    error,
    produits,
    categories
});