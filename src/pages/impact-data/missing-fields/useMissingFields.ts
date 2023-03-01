import { MissingFieldsProps } from "./Models";
import { fieldsConfig } from "./config";
import { useEffect, useState } from "react";

const useMissingFields = (props: MissingFieldsProps) => {
  const [missingFields, setMissingFields] = useState<string[]>([]);

  useEffect(() => {
    let newMissingFields = [];

    if (
      props.selectedKey &&
      props.progressInfo &&
      props.progressInfo[props.selectedKey + "MissingFields"]
    ) {
      newMissingFields = props.progressInfo[
        props.selectedKey + "MissingFields"
      ].map((missingField: string) => {
        const subValues =
          fieldsConfig[props.selectedKey as keyof typeof fieldsConfig];

        if (subValues) {
          return subValues[missingField as keyof typeof subValues];
        }

        return subValues;
      });
    }

    setMissingFields(newMissingFields);
  }, [props.progressInfo, props.selectedKey]);

  return {
    missingFields,
    label: props.label,
    onClose: props.onClose,
    open: props.open,
  };
};

export default useMissingFields;
