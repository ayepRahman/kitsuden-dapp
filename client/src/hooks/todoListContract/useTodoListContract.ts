import { useContract, useProvider } from "wagmi";
import TodoListContract from "contracts/TodoList.json";

const useTodoListContract = () => {
  const provider = useProvider();

  const todoListContract = useContract({
    addressOrName: "0x9b4A5B74A97CCD888014eE0A94c10d27d2f6c356",
    contractInterface: TodoListContract.abi,
    signerOrProvider: provider,
  });

  const getCount = async (address: string) => {
    try {
      const count = await todoListContract.tasksCount(address);
      console.log(count.toNumber());
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return {
    getCount,
  };
};

export default useTodoListContract;
