import { unstable_createMuiStrictModeTheme as createTheme } from "@material-ui/core";

export const loginTheme = createTheme({
  palette: {
    primary: {
      main: "#c2b84d",
    },
    secondary: {
      main: "#c2b84d",
    },
    text: {
      primary: "#ffffff",
    },
  },

  overrides: {
    MuiButton: {
      label: {
        textTransform: "uppercase",
        marginTop: "4px",
      },
      root: {
        boxShadow: "none",
        lineHeight: "16px",
        padding: "16px 16px",
      },
      contained: {
        color: "white !important",
        boxShadow: "none",
        fontFamily: "Arsenal-Bold",
      },
      outlined: {
        color: "#c2b84d !important",
        boxShadow: "none",
        border: "3px solid #c2b84d !important",
        backgroundColor: "#173042",
        fontFamily: "Arsenal",
        lineHeight: "16px",
        padding: "16px 16px",
      },
      text: {
        color: "#215738",
        fontFamily: "Arsenal-Bold",
      },
    },
    MuiButtonBase: {
      root: {
        paddingLeft: "0px",
      },
    },
    MuiFilledInput: {
      underline: {
        "&:before": {
          borderBottom: "0",
        },
        "&:after": {
          borderBottom: "0",
        },
        "&:hover": {
          "&:before": {
            borderBottom: "0",
          },
        },
      },
      root: {
        borderRadius: "4px",
        border: "0.5px solid #bbcdcf",
        backgroundColor: "white",
        transition: "none",
        fontSize: "12px",
        fontFamily: "Chivo",
        color: "#173042",
        lineHeight: "14px",
        "&.Mui-focused": {
          backgroundColor: "white",
        },
      },
    },
    MuiInputLabel: {
      shrink: {
        textTransform: "capitalize",
        fontSize: "12px",
        fontFamily: "Arsenal-Bold",
        color: "#246375",
      },
      root: {
        fontFamily: "Arsenal-Bold",
        fontSize: "12px",
        color: "#246375",
        top: "4px !important",
        "&.Mui-focused": {
          textTransform: "capitalize",
          fontSize: "12px",
          fontFamily: "Arsenal-Bold",
          color: "#246375",
        },
      },
    },
    MuiTypography: {
      body1: {
        fontFamily: "Arsenal",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "15px",
        margin: "0",
        color: "white",
      },
      colorTextPrimary: {
        fontSize: "14px",
        fontFamily: "Arsenal-Bold",
        color: "white",
      },
    },
    MuiAppBar: {
      root: {
        backgroundColor: "white !important",
        boxShadow: "none",
      },
    },
    MuiTab: {
      root: {
        paddingLeft: "8px",
        justifyContent: "flex-start",
        minHeight: "0px",
        minWidth: "0px !important",
        paddingRight: "8px",
        fontFamily: "Chivo",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "10px",
        lineHeight: "12px",
        textTransform: "capitalize",
        margin: "0",
      },
      textColorInherit: {
        opacity: "1",
        "&.Mui-selected": {
          fontFamily: "Chivo-Bold",
        },
      },
    },
    MuiTabs: {
      indicator: {
        backgroundColor: "black",
        height: "2px",
      },
      root: {
        minHeight: "0px",
        width: "100%",
      },
      fixed: {
        height: "24px",
      },
    },
    MuiFormLabel: {
      root: {
        fontFamily: "Arsenal",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "15px",
        margin: "0",
        color: "#173042",
        "&.Mui-focused": {
          color: "#173042",
        },
      },
    },
    MuiPaper: {
      outlined: {
        border: "1px dashed #bbcdcf",
        borderRadius: "4px",
      },
      elevation1: {
        boxShadow: "none",
      },
      root: {
        "&.MuiAlert-root": {
          fontFamily: "Arsenal",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "12px",
          lineHeight: "15px",
          margin: "0",
          color: "#173042",
        },
        "&.MuiAlert-standardInfo": {
          backgroundColor: "#b6ced0",
        },
      },
    },
    MuiTableRow: {
      head: {
        backgroundColor: "#b6ced0",
      },
    },
    MuiTableCell: {
      root: {
        fontFamily: "Arsenal",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "15px",
        margin: "0",
        padding: "0",
        color: "#173042",
      },
    },
    MuiChip: {
      root: {
        fontFamily: "Arsenal-Bold",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "15px",
        backgroundColor: "#173042",
        color: "white",
        borderRadius: "4px",
      },
    },
    MuiCheckbox: {
      root: {
        color: "white",
      },
    },
    MuiRadio: {
      root: {
        color: "white",
      },
    },
  },
});
