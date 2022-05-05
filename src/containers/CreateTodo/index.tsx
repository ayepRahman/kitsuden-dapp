import React from "react";
import { Button, Flex, FormControl, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useTodoListContract from "hooks/todoListContract/useTodoListContract";

export enum FieldNames {
  TODO = "todo",
}

const CreateTodo = () => {
  const { handleSubmit, register } = useForm();
  const { addTodo } = useTodoListContract();

  const onSubmit = async (values: any) => {
    const todo = values[FieldNames.TODO];
    await addTodo(todo);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Flex gap="1rem">
          <Input
            id={FieldNames.TODO}
            placeholder="Add Todo"
            {...register(FieldNames.TODO, {
              required: "Please enter soem value",
              minLength: 4,
              maxLength: 100,
            })}
          />
          <Button type="submit">Add Todo</Button>
        </Flex>
      </FormControl>
    </form>
  );
};

export default CreateTodo;
