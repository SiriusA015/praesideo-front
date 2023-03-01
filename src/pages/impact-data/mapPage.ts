export const mapPathnameToPageConfigIndex = (pathname: string) => {
  let key = pathname.slice(pathname.lastIndexOf("/") + 1);
  switch (key) {
    case "impact-data":
      return 0;
    case "financial-information":
      return 1;
    case "ghc-inventory-method":
      return 2;
    case "inventory-emissions":
      return 3;
    case "ghc-target-setting":
      return 4;
    case "climate-metrics":
      return 5;
    case "supporting-documents":
      return 6;
    default:
      return 1;
  }
};

export const mapPageIndexToKey = (index: number) => {
  switch (index) {
    case 0:
      return "impact-data";
    case 1:
      return "financial-information";
    case 2:
      return "ghc-inventory-method";
    case 3:
      return "inventory-emissions";
    case 4:
      return "ghc-target-setting";
    case 5:
      return "climate-metrics";
    case 6:
      return "supporting-documents";
    default:
      return "";
  }
};
