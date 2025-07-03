import { ReactNode } from "react";
import { To } from "react-router-dom";

export interface TabProps {
  to: To;
  children: ReactNode;
}
