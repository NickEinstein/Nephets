import { Typography, Container } from "@mui/material";
import clsx from "clsx";

function HomeSections(props) {
  const { title, subtitle, description, media, actions, children } = props;

  return (
    <div className={clsx("", children ? "bg-white" : "bg-gray-100")}>
      {children ? (
        <Container style={{ minHeight: 400 }} className="py-20">
          <Typography variant="h4" className="font-bold mb-10 text-center">
            {title}
          </Typography>
          {children}
        </Container>
      ) : (
        <Container className="flex justify-between items-center flex-wrap gap-8 py-10">
          <div className="flex flex-col gap-4 max-w-xs">
            <Typography variant="h4" className="font-bold">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="h6" className="font-bold">
                {subtitle}
              </Typography>
            )}
            {description && (
              <Typography className="my-6">{description}</Typography>
            )}
            <div className="flex items-center flex-wrap gap-4">{actions}</div>
          </div>
          <div
            style={{ maxWidth: 400, maxHeight: 400 }}
            className="border-8 border-primary-main rounded-lg overflow-hidden"
          >
            {media}
          </div>
        </Container>
      )}
    </div>
  );
}
export default HomeSections;
