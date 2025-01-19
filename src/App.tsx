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
import Header from "./components/header";
import { Step3 } from "./components/steps/Step3";
import { Step4 } from "./components/steps/Step4";
import { Step5 } from "./components/steps/Step5";
import { Step6 } from "./components/steps/Step6";

const QuizForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm<FormData>({
    defaultValues: {},
  });

  const steps = 6;

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const allValues = methods.watch();


  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = (data: FormData) => {
    console.log("Отправленные данные:", data);
  };

  return (
    <div className="container mx-auto py-10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Header activeStep={activeStep} steps={steps} />
          <Box my={4}>
            {activeStep === 0 && <Step1 />}
            {activeStep === 1 && <Step2 />}
            {activeStep === 2 && <Step3 />}
            {activeStep === 3 && <Step4 />}
            {activeStep === 4 && <Step5 />}
            {activeStep === 5 && <Step6 />}
          </Box>
          <Box display="flex" justifyContent="space-between">
            <div>
              {activeStep > 0 && (
                <Button variant="outlined" onClick={handleBack}>
                  Назад
                </Button>
              )}
            </div>
            {activeStep < steps - 1 && (
              <Button variant="contained" onClick={handleNext}>
                Далее
              </Button>
            )}
            {activeStep === steps - 1 && (
              <Button type="submit" variant="contained" color="primary">
                Отправить
              </Button>
            )}
          </Box>
        </form>
      </FormProvider>

      <pre>
        <div className="text-red-200">{JSON.stringify(methods.formState.errors, null, 2)}</div>
        {JSON.stringify(allValues, null, 2)}
      </pre>
    </div>
  );
};

export default QuizForm;