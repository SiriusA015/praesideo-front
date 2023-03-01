export const mapFileFieldNameToId = (field: string) => {
  switch (field) {
    case "sustainabilityReport":
      return 1;
    case "ghcInventoryReports":
      return 2;
    case "financialReports":
      return 3;
    case "tcfdReport":
      return 4;
    case "climateStrategy":
      return 5;
    case "offsetStrategy":
      return 6;
    case "other":
      return 100;
    default:
      return 0;
  }
};

export const mapFileFieldIdToName = (id: number) => {
  switch (id) {
    case 1:
      return "sustainabilityReport";
    case 2:
      return "ghcInventoryReports";
    case 3:
      return "financialReports";
    case 4:
      return "tcfdReport";
    case 5:
      return "climateStrategy";
    case 6:
      return "offsetStrategy";
    case 100:
      return "other";
    default:
      return "";
  }
};
