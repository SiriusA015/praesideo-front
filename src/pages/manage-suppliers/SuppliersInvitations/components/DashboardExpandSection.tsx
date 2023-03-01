import { Controller, useForm } from "react-hook-form";
import { Box, Grid, TextField } from "@material-ui/core";

import SupplyChainService from "../../../../services/SupplyChainService";
import { EMAIL_REGEX, ValidationMessages } from "../../../../constants";
import { useAlert } from "../../../../helpers/hooks/useAlert";

type DashboardExpandSectionProps = {
  email?: string;
  supplyChainId: number;
  onUpdate: () => void;
  isDemoable?: boolean;
};

export const DashboardExpandSection = ({
  email,
  supplyChainId,
  onUpdate,
  isDemoable
}: DashboardExpandSectionProps) => {
  const [, setAlert] = useAlert();
  const { trigger, getValues, control } = useForm<{ email?: string }>({
    mode: "onBlur",
    defaultValues: {
      email: email || "",
    },
  });

  const handleSubmit = async () => {
    const isValid = await trigger("email");
    const { email = '' } = getValues();
    if (isValid) {
      const { error } = await SupplyChainService.updateEmail(
        supplyChainId,
        email
      );
      if (!error) {
        onUpdate();
      } else {
        setAlert({ text: error, severity: "error" });
      }
    }
  };

  return (
    <Box m={2}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Controller
            name="email"
            control={control}
            rules={{
              pattern: {
                value: EMAIL_REGEX,
                message: ValidationMessages.INVALID_EMAIL,
              },
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextField
                fullWidth
                value={value || ""}
                variant="filled"
                label="Contact mail information"
                placeholder="Please enter Contact mail information"
                disabled={isDemoable}
                error={Boolean(error?.message)}
                helperText={error?.message}
                onChange={onChange}
                onBlur={() => {
                  onBlur();
                  handleSubmit();
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
