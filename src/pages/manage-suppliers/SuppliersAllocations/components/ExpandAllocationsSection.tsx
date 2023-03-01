import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

import {
  CurrenciesType,
  SupplierAllocation,
  SupplierAllocations,
  SupplierTypeCategories,
} from "../../models";
import { AllocationForm } from "./AllocationForm";
import styles from "../styles.module.scss";
import { Icon } from "../../../../components/Icon/Icon";

type ExpandAllocationsSectionProps = {
  supplierAllocations?: SupplierAllocations;
  supplyChainId: number;
  onUpdate: (supplierAllocations: SupplierAllocations) => void;
  isDemoable?:boolean;
  types: SupplierTypeCategories[];
  categories: SupplierTypeCategories[];
  currencies: CurrenciesType[];
};

export const ExpandAllocationsSection = ({
  supplierAllocations,
  supplyChainId,
  onUpdate,
  types,
  isDemoable,
  categories,
  currencies,
}: ExpandAllocationsSectionProps) => {
  const [allocations, setAllocations] = useState(
    supplierAllocations?.allocations || [
      {
        supplierAllocationId: uuidv4(),
      },
    ]
  );
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    setAllocations(
      supplierAllocations?.allocations || [
        {
          supplierAllocationId: uuidv4(),
        },
      ]
    );
    setDisabled(
      supplierAllocations?.allocations?.some(
        ({ supplierAllocationId }) => typeof supplierAllocationId === "string"
      ) || false
    );
  }, [supplierAllocations?.allocations]);

  const handleAddAllocation = () => {
    setAllocations((allocations) => [
      ...allocations,
      {
        supplierAllocationId: uuidv4(),
      },
    ]);
    setDisabled(true);
  };

  const handleDeleteAllocation = (id: string) => {
    setAllocations((allocations) =>
      allocations.filter(
        ({ supplierAllocationId }) => id !== supplierAllocationId
      )
    );
    setDisabled(false);
  };

  return (
    <>
      <Box m={1}>
        <Typography>Allocation(s):</Typography>
      </Box>
      {(allocations as SupplierAllocation[]).map(
        (
          { supplierAllocationId, ...allocation }: SupplierAllocation,
          i: number
        ) => (
          <Box key={supplierAllocationId} m={2}>
            <AllocationForm
              isDemoable={isDemoable}
              deleteAvailable={i !== 0}
              supplyChainId={supplyChainId}
              supplierAllocationId={supplierAllocationId}
              defaultValues={allocation}
              types={types}
              categories={categories}
              currencies={currencies}
              onUpdate={onUpdate}
              onDelete={handleDeleteAllocation}
            />
          </Box>
        )
      )}
      <Box m={1}>
        <Button
          variant="text"
          disabled={isDisabled || isDemoable}
          onClick={handleAddAllocation}
        >
          <Icon icon={"plus"} size={"sm"} className={styles.plusIcon} solid />
          Add allocation
        </Button>
      </Box>
    </>
  );
};
