import { createContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const DarkModeContext = createContext<[string , (theme: string) => void]>(["light", () => {}]);

export default DarkModeContext;