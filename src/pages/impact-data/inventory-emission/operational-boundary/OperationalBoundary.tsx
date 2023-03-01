import CustomForm from "../../../../components/CustomForm/CustomForm";
import { useAuth } from "../../../../helpers/useAuth";
import { useOperationalBoundary } from "./useOperationalBoundary";

interface OperationalBoundaryProps {
  isImpactDataEditable: boolean;
  isDataDemoable?: boolean;
  updateCompletedInformation: () => void;
}

const OperationalBoundary = (props: OperationalBoundaryProps) => {
  const { isImpactPerformanceAvailable } = useAuth();
  const { activeConfig, formDefaultValues, onFormSubmit } =
    useOperationalBoundary();
  const handleSubmit = async (value: any) => {
    await onFormSubmit(value);
    props.updateCompletedInformation();
  };

  if (activeConfig) {
    return (
      <CustomForm
        config={activeConfig.formConfig}
        onSubmit={handleSubmit}
        isDataDemoable={props.isDataDemoable}
        isDataEditable={
          isImpactPerformanceAvailable ? props.isImpactDataEditable : false
        }
        data={formDefaultValues}
        submitOnBlur
      />
    );
  } else {
    return <></>;
  }
};

export default OperationalBoundary;
