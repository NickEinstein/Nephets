// import { Container } from "@mui/material";
// import PageFooter from "./PageFooter";
// import ProtectedPageHeader from "./ProtectedPageHeader";

function ProtectedPageScaffold({ children }) {
  return children;
  // return (
  //   <>
  //     <ProtectedPageHeader />
  //     <Container className="py-6 min-h-full">{children}</Container>
  //     <PageFooter />
  //   </>
  // );
}

export default ProtectedPageScaffold;
