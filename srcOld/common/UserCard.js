import { Paper, Typography } from "@mui/material";
import clsx from "clsx";

/**
 *
 * @param {UserCardProps} props
 */
function UserCard(props) {
  const { image, placeholder, className, children, ...rest } = props;

  return (
    <Paper
      variant="outlined"
      className={clsx(
        "w-56 h-80 relative overflow-hidden rounded-lg flex flex-col",
        className
      )}
      {...rest}
    >
      <div className="w-full h-56">
        {image ? (
          <img alt="alt" src={image} className="w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Typography variant="h1">{placeholder?.slice(0, 1)}</Typography>
          </div>
        )}
      </div>
      <div className="p-4 bg-primary-dark flex-1 text-white">{children}</div>
    </Paper>
  );
}

export default UserCard;

/**
 * @typedef {{image: string, placeholder: string} & import("@mui/material").PaperProps} UserCardProps
 */
