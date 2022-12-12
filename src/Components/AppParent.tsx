import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

export default function AppParent() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
