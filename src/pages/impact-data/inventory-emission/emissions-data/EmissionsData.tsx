import CustomForm from "../../../../components/CustomForm/CustomForm";
import { useAuth } from "../../../../helpers/useAuth";
import { ImpactmEmissionModel } from "../../../../models/impactm-emission.model";
import { useEmissionsData } from "./useEmissionsData";

interface EmissionsDataProps {
  isImpactDataEditable: boolean;
  isDataDemoable?: boolean;
  year: number;
  isMeasurement: boolean;
  data: ImpactmEmissionModel | undefined;
  updateCompletedInformation: () => void;
}

const EmissionsData = ({
  year,
  isImpactDataEditable,
  isDataDemoable,
  isMeasurement,
  data,
  updateCompletedInformation,
}: EmissionsDataProps) => {
  const { isImpactPerformanceAvailable } = useAuth();
  const { activeConfig, onFormSubmit, formDefaultValues } = useEmissionsData(year, isMeasurement, data);

  console.log('this is formDefaultValues', formDefaultValues);
  isDataDemoable = isMeasurement;

  console.log('this is data_________22', activeConfig);   

  const handleSubmit = async (value: any) => {
    try {
      await onFormSubmit(value);
      await updateCompletedInformation();
    } catch (e) {}
  };

  return formDefaultValues ? (
    <CustomForm
      submitOnBlur
      config={activeConfig}
      isDataDemoable={isDataDemoable}
      isDataEditable={
        isImpactPerformanceAvailable ? isImpactDataEditable : false
      }
      data={formDefaultValues}
      onSubmit={handleSubmit}
    />
  ) : null;
};

export default EmissionsData;
