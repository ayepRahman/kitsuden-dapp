import { useContract, useProvider, useSigner } from "wagmi";
import TodoListContract from "contracts/TodoList.json";
import { TODO_LIST_CONTRACT_ADDRESS } from "constants/config";

const useTodoListContract = () => {
  const provider = useProvider();
  const [{ data }] = useSigner();

  const todoListContractProvider = useContract({
    addressOrName: TODO_LIST_CONTRACT_ADDRESS,
    contractInterface: TodoListContract.abi,
    signerOrProvider: provider,
  });
  const todoListContractSigner = useContract({
    addressOrName: TODO_LIST_CONTRACT_ADDRESS,
    contractInterface: TodoListContract.abi,
    signerOrProvider: data,
  });

  const getCount = async (address: string) => {
    try {
      const count = await todoListContractProvider.tasksCount(address);
      console.log(count.toNumber());
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const addTodo = async (content: string) => {
    try {
      const res = await todoListContractSigner.createTask(content);
      console.log("addtodo", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getTodo = async (address: string, index: number) => {
    try {
      return await todoListContractProvider.tasks(address, index);
    } catch (error) {
      console.log(error);
    }
  };

  // const toggleComplete = (isComplete: boolean) => {
  //   try {
  //   } catch (error) {}
  // };

  return {
    getCount,
    getTodo,
    addTodo,
  };
};

export default useTodoListContract;
