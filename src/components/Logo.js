import React from "react";
import { CgGoogleTasks } from "react-icons/cg";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/ROUTES";
const Logo = () => {
  return (
    <Link to={ROUTES.HOME} className="my-4 flex items-center justify-center">
      <CgGoogleTasks className="text-3xl mr-2" />
      <span className="text-md font-medium">To Do</span>
    </Link>
  );
};

export default Logo;