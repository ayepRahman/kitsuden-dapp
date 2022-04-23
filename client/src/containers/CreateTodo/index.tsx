import React from "react";
import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export enum FieldNames {
  TODO = "todo",
}

const CreateTodo = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = (values: any) => {
    console.log("TRIGGER");
    console.log("VALUES", values);
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
