import { Divider, Typography } from "@mui/material";
import { string } from "prop-types";
import { useTheme } from "../providers/ThemeProvider";

const PageHeader = ({ title, subtitle }) => {

  const {isDark} = useTheme();

  return (
    <>
      <Typography variant="h2" component="h1"
      color={isDark? "white" : "inherit"}>
        {title}
      </Typography>
      <Typography variant="h5" component="h2"
      color={isDark? "white" : "inherit"}>
      {subtitle}
      </Typography>
      <Divider sx={{ my: 2 }}/>
    </>
  );
};

export default PageHeader;

PageHeader.propTypes = {
  title: string.isRequired,
  subtitle: string.isRequired,
};
