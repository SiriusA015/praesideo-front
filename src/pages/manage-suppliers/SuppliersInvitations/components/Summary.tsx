import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import SupplyChainService from "../../../../services/SupplyChainService";
import { AvailableSuppliers, SupplierInvitationInfo } from "../models";
import { INVITATIONS_TABS } from "../constants";
import styles from "../styles.module.scss";

type SummaryProps = {
  defaultSupplyChainId: number;
  supplierInvitationInfo?: SupplierInvitationInfo;
  isDemoable?: boolean;
  onSubmit: () => void;
  setSupplyId: Dispatch<SetStateAction<number>>;
  setInvitation: Dispatch<SetStateAction<INVITATIONS_TABS>>;
};

export const Summary = ({
  defaultSupplyChainId,
  supplierInvitationInfo,
  isDemoable,
  onSubmit,
  setSupplyId,
  setInvitation,
}: SummaryProps) => {
  const [availableSuppliers, setSuppliers] = useState<AvailableSuppliers[]>();
  const { control, handleSubmit, setValue } = useForm<{
    supplier: AvailableSuppliers | null;
  }>({
    defaultValues: {
      supplier: null,
    },
  });

  useEffect(() => {
    SupplyChainService.getAvailableSuppliers().then(({ data }) => {
      setSuppliers(data);
      if (defaultSupplyChainId) {
        setValue(
          "supplier",
          data?.find(
            (el) => el.supplyChainId === defaultSupplyChainId
          ) as AvailableSuppliers
        );
      }
    });
  }, []);

  const goToInvitationsDashboard = () => {
    setInvitation(INVITATIONS_TABS.DASHBOARD);
  };

  return availableSuppliers ? (
    !availableSuppliers.length ? (
      <Box m="50px 0">
        <h3>
          Please ensure you have suppliers ready to be invited
          <Link
            className={styles.link}
            underline="always"
            color="secondary"
            onClick={goToInvitationsDashboard}
          >
            here
          </Link>
        </h3>
      </Box>
    ) : (
      <Grid container>
        <Grid
          item
          container
          spacing={2}
          wrap="nowrap"
          className={styles.section}
        >
          <Grid item xs={6}>
            <h3 className={styles.sectionHeader}>Invitee</h3>
            <Paper className={styles.sectionBody}>
              <Box padding="10px 15px" width="100%">
                <form
                  id="send-invitation-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {availableSuppliers && (
                    <Controller
                      name="supplier"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          value={field.value as AvailableSuppliers}
                          disableClearable
                          onChange={(e, option) => {
                            field.onChange(option);
                            setSupplyId(option?.supplyChainId as number); // TODO: fix switching from uncontrolled to controlled warning
                          }}
                          options={availableSuppliers}
                          getOptionLabel={(option) =>
                            `${option?.name || ""} ${option?.email || ""}`
                          }
                          getOptionSelected={(option, value) =>
                            value === undefined ||
                            value === null ||
                            option.supplyChainId === value.supplyChainId
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              disabled={isDemoable}
                              label="Supplier"
                              variant="filled"
                            />
                          )}
                          renderOption={({ name, email }) => (
                            <Box display="flex" alignItems="center">
                              <Box m="0 10px">
                                <Typography>{name}</Typography>
                              </Box>
                              <TextField
                                disabled={isDemoable}
                                variant="filled"
                                value={email}
                              />
                            </Box>
                          )}
                        />
                      )}
                    />
                  )}
                </form>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <h3 className={styles.sectionHeader}>Inviter</h3>
            <Paper className={styles.sectionBody}>
              {supplierInvitationInfo?.cc.map(({ name, email }) => (
                <Box
                  key={name}
                  display="flex"
                  alignItems="center"
                  padding="10px 15px"
                >
                  <TextField
                    disabled={isDemoable}
                    fullWidth
                    label={name}
                    variant="filled"
                    value={email}
                  />
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
        <Grid item container spacing={2} className={styles.section}>
          <Grid item xs={12}>
            <h3 className={styles.sectionHeader}>Invitation Message</h3>
            <Paper className={styles.sectionBody}>
              <Box width="100%" padding="10px 15px">
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      disabled={isDemoable}
                      fullWidth
                      label="Subject"
                      variant="filled"
                      value={supplierInvitationInfo?.subject}
                    />
                  </Grid>
                </Grid>
                <Box padding="10px 0">
                  {supplierInvitationInfo?.body && (
                    <div
                      className={styles.mailContent}
                      dangerouslySetInnerHTML={{
                        __html: supplierInvitationInfo.body,
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    )
  ) : null;
};
