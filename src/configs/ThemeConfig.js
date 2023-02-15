import { createTheme, alpha } from "@mui/material/styles";
import { DateFormatEnum } from "constants/DateContants";

export const lightTheme = customizeComponents({});
export const darkTheme = customizeComponents({ palette: { mode: "dark" } });

/**
 *
 * @param {import("@mui/material").Theme} theme
 */
export function customizeComponents(theme) {
  return createTheme({
    ...theme,
    palette: {
      ...theme.palette,
      primary: {
        lighter: "#FAFAFA",
        main: "#EF4901",
        light: "#0202AD4D",
        dark: "#370548",
      },

      secondary: {
        main: "#000051",
        dark: "#FAFAFA",
      },
    },

    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
      },
    },
    typography: {
      // fontFamily: ["Merriweather", "serif"].join(),
      fontFamily: ["Roboto", "sans-serif"].join(),
      fontSize: 12,
      color: "#000051",
      button: {
        textTransform: "none",
        // width: "8rem",
        // height: "3rem",
      },
    },
    components: {
      MuiContainer: {
        defaultProps: {
          maxWidth: "xl",
        },
      },
      MuiIcon: {
        defaultProps: {
          baseClassName: "material-icons-outlined",
        },
      },
      MuiDatePicker: {
        defaultProps: {
          inputFormat: DateFormatEnum.FORMAT,
        },
      },
      MuiDesktopDatePicker: {
        defaultProps: {
          inputFormat: DateFormatEnum.FORMAT,
        },
      },
      MuiMobileDatePicker: {
        defaultProps: {
          inputFormat: DateFormatEnum.FORMAT,
        },
      },
      MuiTabs: {
        defaultProps: {
          variant: "scrollable",
          scrollButtons: "auto",
          allowScrollButtonsMobile: true,
        },
      },
      MuiLoadingButton: {
        defaultProps: {
          variant: "contained",
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            // width: '48',
          }),
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            "&.MuiInputBase-formControl": {
              borderRadius: 24,
            },
          }),
        },
      },

      MuiDialog: {
        defaultProps: {
          maxWidth: "xs",
        },
      },
    },
  });
}
