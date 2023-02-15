import logoImg from "assets/imgs/logo.png";
import clsx from "clsx";
import "./Logo.css";

/**
 *
 * @param {import("react").ComponentPropsWithoutRef<"img">} props
 */
function Logo(props) {
  return (
    <img
      src={logoImg}
      alt="logo"
      {...props}
      className={clsx("Logo", props.className)}
    />
  );
}

export default Logo;
