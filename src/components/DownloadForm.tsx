import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import FormData, { formSchema } from "../entities/formData";
import { onSubmitHandler } from "../handlers/formHandler";

const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormControl isInvalid={!!errors.lookback}>
        <FormLabel htmlFor="lookback">
          <Text>Look back Period (days)</Text>
        </FormLabel>
        <Input
          id="lookback"
          type="number"
          {...register("lookback", { valueAsNumber: true })}
        />
        <FormErrorMessage>
          {errors.lookback && errors.lookback.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        Download Data
      </Button>
    </form>
  );
};

export default Form;
