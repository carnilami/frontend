import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AccountNav from "../../components/nav/AccountNav";

export const AccountLayout = () => {
  return (
    <Grid
      mt={8}
      templateAreas={{
        base: `"aside" "main"`,
        md: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        md: "295px 1fr",
      }}
    >
      <GridItem gridArea="aside">
        <AccountNav />
      </GridItem>
      <GridItem gridArea="main">
        <Outlet />
      </GridItem>
    </Grid>
  );
};
