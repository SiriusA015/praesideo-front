import {
  IMPACT_MEASUREMENT_VARIANT_NAME,
  IMPACT_PERFORMANCE_MEASUREMENT_VARIANT_NAME,
  IMPACT_PERFORMANCE_VARIANT_NAME,
  TRACE_L_VARIANT_NAME,
  TRACE_M_VARIANT_NAME,
  TRACE_S_VARIANT_NAME,
  TRACE_UNLIMITED_VARIANT_NAME,
  TRACE_XS_VARIANT_NAME,
} from "./constants";

export const VARIANTS_CONFIG = {
  descriptions: [
    {
      tile: "Impact Measurement",
      description: "Capture your inventory emissions at a glance",
    },
    {
      tile: "Impact Performance",
      description: "Assess your climate impact",
    },
    {
      tile: "Trace Performance",
      description:
        "Quantify, track and transition the climate impact of your supply chain",
    },
  ],
  mapVariantsToDescriptions: [
    {
      names: [
        TRACE_XS_VARIANT_NAME,
        TRACE_S_VARIANT_NAME,
        TRACE_M_VARIANT_NAME,
        TRACE_L_VARIANT_NAME,
        TRACE_UNLIMITED_VARIANT_NAME,
      ],
      descriptionsIndex: [0, 1, 2],
    },
    {
      names: [IMPACT_PERFORMANCE_MEASUREMENT_VARIANT_NAME],
      descriptionsIndex: [0, 1],
    },
    {
      names: [IMPACT_MEASUREMENT_VARIANT_NAME],
      descriptionsIndex: [0],
    },
    {
      names: [IMPACT_PERFORMANCE_VARIANT_NAME],
      descriptionsIndex: [1],
    },
  ],
};
