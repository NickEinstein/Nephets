import { forwardRef } from "react";
import { Typography } from "@mui/material";
import { CurrencyEnum } from "constants/NumberConstants";
import currencyjs from "currency.js";

export const CurrencyTypography = forwardRef(
  /**
   *
   * @param {{currency: keyof typeof CurrencyEnum} & import("@mui/material").TypographyProps} props
   */
  (props, ref) => {
    const { children, currency, ...rest } = props;
    const _currency = CurrencyEnum[currency || "GBP"] || CurrencyEnum.GBP;

    return (
      <Typography ref={ref} {...rest}>
        {currencyjs(children || 0, { symbol: _currency.symbol }).format()}
      </Typography>
    );
  }
);

CurrencyTypography.defaultProps = {
  currency: "GBP",
};

export default CurrencyTypography;
