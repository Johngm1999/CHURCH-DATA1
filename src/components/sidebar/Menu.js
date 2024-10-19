import React, { useEffect, useState } from "react";
import { Accordion, Col, Row } from "react-bootstrap";

import { NavLink, useLocation } from "react-router-dom";
import { useAuthenticationState } from "../../context/Auth.context";

function Menu({ routes }) {
    const [activeModule, setActiveModule] = useState("");

    const { pathname } = useLocation();
    const { user } = useAuthenticationState();
    useEffect(() => {
        const routesInsideModule = routes.filter((route) => !!route.module);

        const currentRouteInsideModule = routesInsideModule.find(
            (route) => pathname === "/" + route.path
        );
        if (currentRouteInsideModule) {
            setActiveModule(currentRouteInsideModule.module);
        } else {
            setActiveModule(pathname);
        }

        return () => {
            setActiveModule("");
        };
    }, [pathname]);

    const menuIconMap = {
        Report: {
            active: "",
            inactive: "",
        },
        overview: {
            active: "",
            inactive: "",
        },
    };

    const links = {};
    const createInnerLinks = (linkProps) => {
        const { module, path, name } = linkProps;

        links[module] = links[module] ?? [];

        links[module].push(
            <NavLink
                key={path}
                to={"/" + path}
                className={({ isActive }) => {
                    return `${
                        isActive ? "text-info" : "text-light"
                    } d-block my-2 small`;
                }}
            >
                {name}
            </NavLink>
        );
    };

    const createOuterLinks = (linkProps) => {
        const { path, name } = linkProps;

        links[name] = (
            <NavLink
                key={path}
                to={"/" + path}
                className="d-block my-1 py-3 small rounded-smooth text-white"
            >
                <Row>
                    <Col sm={1}>
                        {pathname === "/" + path
                            ? menuIconMap[path].active
                            : menuIconMap[path].inactive}
                    </Col>
                    <Col sm={10}>
                        <div className="ps-3">{name}</div>
                    </Col>
                </Row>
            </NavLink>
        );
    };

    routes
        .filter((route) => !route.hiddenFromMenu)
        .forEach((route) => {
            if (!!route.module) {
                createInnerLinks(route);
            } else {
                createOuterLinks(route);
            }
        });

    return (
        // order of menu is based on order of routes
        <>
            <Accordion flush>
                {Object.keys(links).map((module, i) =>
                    !Array.isArray(links[module]) ? (
                        links[module]
                    ) : (
                        <Accordion.Item
                            eventKey={i}
                            key={i}
                            className="bg-transparent border-0"
                        >
                            <Accordion.Button className="bg-transparent px-0">
                                {activeModule === module
                                    ? menuIconMap[module].active
                                    : menuIconMap[module].inactive}
                                <span className="ps-3 text-white small text-capitalize">
                                    {module}
                                </span>
                            </Accordion.Button>
                            <Accordion.Body className="pt-2 pb-0 ps-4 ms-3 pe-0">
                                {links[module]}
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                )}
            </Accordion>
        </>
    );
}

export default Menu;
