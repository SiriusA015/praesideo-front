import { createContext, useContext, useState } from "react";
import { Color } from "@material-ui/lab";

type AlertContextType = [
  AlertMessageType | null,
  React.Dispatch<React.SetStateAction<AlertMessageType | null>>
];

const AlertContext = createContext<AlertContextType>([null, () => {}]);

type AlertMessageType = {
  text: string;
  severity?: Color;
  duration?: number;
};

export function AlertProvider({ children }: { children: JSX.Element }) {
  const [alert, setAlert] = useState<AlertMessageType | null>(null);
  return (
    <AlertContext.Provider value={[alert, setAlert]}>
      {children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  return useContext<AlertContextType>(AlertContext);
};
