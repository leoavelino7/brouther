import { createMappedRouter } from "../../src";
import Root from "./pages/root";
import UserIdAddress from "./pages/user-id-address";
import { Fragment, lazy } from "react";

const Users = lazy(() => import("./pages/users"));

export const router = createMappedRouter({
    index: {
        path: "/",
        element: <Root />,
    },
    addressList: {
        path: "/user/:id/address/?sort=string",
        element: <UserIdAddress />,
    },
    users: {
        path: "/users?id=number!",
        element: <Users />,
    },
    post: {
        path: "/posts/:id?language=number!",
        element: <Users />,
    },
    double: {
        path: "/posts/:id/status/:status?language=number!",
        element: <Fragment />,
    },
} as const);

export const linkToPosts = router.link(router.links.double, { status: "ok", id: "9999" }, { language: 5 });
