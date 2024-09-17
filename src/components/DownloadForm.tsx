import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";

const schema = z.object({
  lookback: z
    .number()
    .min(1, "Lookback period must be at least 1 day")
    .max(365, "Lookback period cannot exceed 365 days"),
});

type FormData = z.infer<typeof schema>;

const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = (data: FormData) => {
    // Implement the download logic using the `lookback` value
    console.log(`Downloading data for the past ${data.lookback} days`);
  };

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
