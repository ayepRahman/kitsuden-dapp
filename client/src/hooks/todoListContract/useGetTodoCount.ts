import { useContractRead, useProvider } from "wagmi";
import TodoListContract from "contracts/TodoList.json";
import { TODO_LIST_CONTRACT_ADDRESS } from "constants/config";

const useGetTodoCount = (address: string) => {
  const provider = useProvider();
  return useContractRead(
    {
      addressOrName: TODO_LIST_CONTRACT_ADDRESS,
      contractInterface: TodoListContract.abi,
      signerOrProvider: provider,
    },
    "tasksCount",
    {
      args: [address],
    }
  );
};

export default useGetTodoCount;
