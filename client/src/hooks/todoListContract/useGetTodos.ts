import React from "react";
import useGetTodoCount from "./useGetTodoCount";
import useTodoListContract from "./useTodoListContract";

const useGetTodos = (address: string) => {
  const [todos, setTodos] = React.useState<
    { id: any; content: any; completed: boolean }[] | undefined
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>(false);
  const [{ data: countData }] = useGetTodoCount(address);
  const { getTodo } = useTodoListContract();
  const counts = countData?.toNumber();

  const getTodos = React.useCallback(async () => {
    setIsLoading(true);
    try {
      if (address && counts > 0) {
        let updatedTodos = [];
        for (let i = 0; i < counts; i++) {
          const res = await getTodo(address, i);
          updatedTodos.push({
            id: res[0]?.toNumber(),
            content: res[1],
            completed: !!res[2],
          });
        }

        setIsLoading(false);
        return updatedTodos;
      }

      return [];
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  }, [address, counts, getTodo]);

  React.useEffect(() => {
    (async () => {
      const res = await getTodos();
      setTodos(res);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    todos,
    error,
    isLoading,
  };
};

export default useGetTodos;
