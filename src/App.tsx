import React, { useState } from "react";
import { useForm, Controller, FormProvider, useFormContext } from "react-hook-form";
import {
  Box,
  Button,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Step1 } from "./components/steps/Step1";
import { Step2 } from "./components/steps/Step2";

interface FormData {
  name: string;
  contactMethod: "email" | "phone";
  contactValue: string;
  age: number;
}

const QuizForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm<FormData>({
    defaultValues: {
      name: "",
      contactMethod: "email",
      contactValue: "",
      age: 0,
    },
  });

  const steps = ["Шаг 1", "Шаг 2"];

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = (data: FormData) => {
    console.log("Отправленные данные:", data);
  };

  return (
    <div className="container mx-auto py-10">
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box my={4}>
          {activeStep === 0 && <Step1 />}
          {activeStep === 1 && <Step2 />}
        </Box>
        <Box display="flex" justifyContent="space-between">
          {activeStep > 0 && (
            <Button variant="outlined" onClick={handleBack}>
              Назад
            </Button>
          )}
          {activeStep < steps.length - 1 && (
            <Button variant="contained" onClick={handleNext}>
              Далее
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button type="submit" variant="contained" color="primary">
              Отправить
            </Button>
          )}
        </Box>
      </form>
    </FormProvider>
    </div>
  );
};

export default QuizForm;