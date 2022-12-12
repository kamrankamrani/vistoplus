import { useMediaQuery } from "@mui/material";
import { createContext } from "react";

export default function IS_smScreen() {
  const SMScreenSize = createContext(useMediaQuery("(min-width:600px)"));
  return SMScreenSize;
}
