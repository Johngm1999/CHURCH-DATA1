import React from "react";
import { Button } from "@mui/material";

function SearchButton({ children, ...rest }) {
    return <Button {...rest}>{children}</Button>;
}

export default SearchButton;
