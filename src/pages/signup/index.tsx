import { Button } from "@material-ui/core";

import useQuery from "../../helpers/hooks/useQuery";
import PersonalDataForm from "./PersonalDataForm";
import { personalDataSectionConfig as activeConfig } from "./config";
import styles from "./styles.module.scss";

type SignUpProps = {
  handleClickOnAlternativeButton: () => void;
  handleClickOnSubmitFormButton: (value: Record<string, string>) => void;
};

const SignUp = ({
  handleClickOnAlternativeButton,
  handleClickOnSubmitFormButton,
}: SignUpProps) => {
  const query = useQuery();

  const handleSubmit = (value: Record<string, string>) => {
    handleClickOnSubmitFormButton({ ...value, cid: query.get("cid") || "" });
  };

  return (
    <div className={styles.form}>
      <h1>{activeConfig.title}</h1>
      {activeConfig.subTitle ? <h2>{activeConfig.subTitle}</h2> : <></>}
      <PersonalDataForm
        config={activeConfig.formConfig}
        onSubmit={handleSubmit}
        isDataEditable={true}
      />
      <p className={styles.noAccount}>
        <span>{activeConfig.alternativeOptionQuestion}</span>
      </p>
      <Button variant="outlined" onClick={handleClickOnAlternativeButton}>
        {activeConfig.alternativeOptionButtonLabel}
      </Button>
    </div>
  );
};

export default SignUp;
