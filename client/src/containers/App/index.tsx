import React from "react";
import { Box, Heading, Grid } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import CreateTodo from "containers/CreateTodo";
import { useAccount } from "wagmi";

/**
 *
 * Maybe add react router dom here?
 */

export const App = () => {
  const [{ data, error, loading }, disconnect] = useAccount({
    fetchEns: true,
  });

  console.log("data", data);

  return (
    <div>
      <Box textAlign="center" fontSize="xl">
        <Grid p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Heading as="h1">Smart Contract Todo List</Heading>
        </Grid>
        <Grid justifyContent="center">
          <CreateTodo />
        </Grid>
      </Box>
    </div>
  );
};

export default App;
