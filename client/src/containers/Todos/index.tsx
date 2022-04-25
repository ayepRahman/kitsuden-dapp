import React from "react";
import { useAccount } from "wagmi";
import useGetTodos from "hooks/todoListContract/useGetTodos";

const Todos = () => {
  const [{ data: accountData }] = useAccount();
  const { todos } = useGetTodos(accountData?.address || "");

  console.log(todos);

  return <div>Todos</div>;
};

export default Todos;
