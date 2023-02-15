import { Typography, Container } from "@mui/material";
import clsx from "clsx";

function HowItWorksSection({ title, children, className, bg }) {
  return (
    <div className={clsx(bg ? "bg-gray-100" : "bg-white", className)}>
      <Container style={{ minHeight: 400 }} className="py-20">
        {title && (
          <Typography variant="h4" className="font-bold mb-10 text-center">
            {title}
          </Typography>
        )}
        {children}
      </Container>
    </div>
  );
}
export default HowItWorksSection;
