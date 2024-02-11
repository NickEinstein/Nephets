import { lazy } from "react";
import "./App.css";
import AppThemeProvider from "AppThemeProvider";
import { Icon, IconButton } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { notistackRef } from "constants/RefConstants";
import Suspense from "common/Suspense";
import useAuthUser from "hooks/useAuthUser";
import LoadingModal from "common/LoadingModal";
import useLoadingModal from "hooks/useLoadingModal";
import useScrollToTop from "hooks/useScrollToTop";
import { useLocation } from "react-router-dom";

function App() {
  const { isLoadingModal } = useLoadingModal();

  const authUser = useAuthUser();

  const location = useLocation();

  useScrollToTop(location);

  return (
    <AppThemeProvider>
      <SnackbarProvider
        ref={notistackRef}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        preventDuplicate
        action={(key) => (
          <IconButton
            onClick={() => {
              notistackRef.current.closeSnackbar(key);
            }}
            color="inherit"
            size="small"
          >
            <Icon>close</Icon>
          </IconButton>
        )}
      >
        <Suspense>
          {authUser?.accessToken ? <AppProtected /> : <AppPublic />}
        </Suspense>
      </SnackbarProvider>
      <LoadingModal open={isLoadingModal} />
    </AppThemeProvider>
  );
}

export default App;

const AppPublic = lazy(() => import("./AppPublic"));
const AppProtected = lazy(() => import("./AppProtected"));
