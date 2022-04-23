import React from "react";
import { Box, Heading, Grid, Button } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import CreateTodo from "containers/CreateTodo";
import { useAccount, useConnect, useNetwork } from "wagmi";
import useTodoListContract from "hooks/todoListContract/useTodoListContract";

export const App = () => {
  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }] = useAccount();
  const { getCount } = useTodoListContract();
  const [{ data: networkData }] = useNetwork();

  React.useEffect(() => {
    (async () => {
      if (accountData?.address) {
        await getCount(accountData?.address);
      }
    })();
  }, [accountData?.address, getCount]);

  return (
    <div>
      <Box textAlign="center" fontSize="xl">
        <div>
          <div>Network name: {networkData.chain?.name} </div>
          <div>Network id: {networkData.chain?.id} </div>
        </div>
        <div>
          {!data?.connected &&
            data.connectors.map((connector) => (
              <Button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect(connector)}
              >
                {connector.name}
                {!connector.ready && " (unsupported)"}
              </Button>
            ))}

          {error && <div>{error?.message ?? "Failed to connect"}</div>}
        </div>
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
