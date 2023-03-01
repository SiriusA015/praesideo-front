import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";

// Components
import Router from "./Router";
import { AlertProvider } from "./helpers/hooks/useAlert";
import { ProvideAuth } from "./helpers/useAuth";
import Alert from "./components/Alert";
import { theme } from "./theme";
import { TextProvider } from "./helpers/hooks/useText";

const App = () => (
  <HashRouter>
    <ProvideAuth>
      <ThemeProvider theme={theme}>
        <TextProvider>
          <AlertProvider>
            <>
              <Router />
              <Alert />
            </>
          </AlertProvider>
        </TextProvider>
      </ThemeProvider>
    </ProvideAuth>
  </HashRouter>
);

export default App;
