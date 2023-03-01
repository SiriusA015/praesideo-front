import { useEffect, useState } from "react";

import { useAlert } from "../../../../helpers/hooks/useAlert";
import { useAuth } from "../../../../helpers/useAuth";
import SupplyChainService from "../../../../services/SupplyChainService";
import { SuppliersYearsType } from "../../models";

export const useSuppliersYears = (defaultYear = 0) => {
  const [, setAlert] = useAlert();
  const [years, setYears] = useState<SuppliersYearsType>({
    selected: defaultYear,
  });
  const {
    user: { companyId },
  } = useAuth();

  const fetchYears = async () => {
    const { error, data } = await SupplyChainService.getSuppliersYears(
      companyId
    );
    if (!error && data) {
      setYears((state) => {
        if (state.selected && !state?.list) {
          return {
            selected: state.selected,
            list: data,
          };
        } else {
          return {
            selected: data?.[0]?.yearRepresentationId,
            list: data,
          };
        }
      });
    } else {
      setAlert({ text: error || "", severity: "error" });
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  return {
    fetchYears,
    setYears,
    years,
  };
};
