import { Middleware } from "@nuxt/types";

const redirectDefaultSlug: Middleware = ({ route, redirect }) => {
    if (route.path === "/default-slug") {
        // 'default-slug' nahraďte vaším konkrétním slugem
        redirect("/");
    }
};

export default redirectDefaultSlug;
