import React, { createContext, useContext, useEffect, useState } from "react";
import { TextModel } from "../../models/text.model";
import { AppDataTextService } from "../../services/AppDataTextService";

type TextContextType = {
  getText: (textKey: string) => string;
};

const TextContext = createContext<TextContextType>({
  getText: (textKey: string) => "",
});

const useProvideText = () => {
  const [texts, setTexts] = useState<TextModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setTexts(await AppDataTextService.getAllTexts());
    };

    fetchData();
  }, []);

  const getText = (textKey: string): string => {
    return texts?.find((text) => text.textKey === textKey)?.textValue || "";
  };

  return { getText };
};

export function TextProvider({ children }: any) {
  const text = useProvideText();
  return <TextContext.Provider value={text}>{children}</TextContext.Provider>;
}

export const useText = () => {
  return useContext<TextContextType>(TextContext);
};
