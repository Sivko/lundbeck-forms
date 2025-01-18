import { Box, MenuItem, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface FormData {
  name: string;
  contactMethod: "email" | "phone";
  contactValue: string;
  age: number;
}

export const Step2: React.FC = () => {
  const { control } = useFormContext<FormData>();

  return (
    <Box>
      <Controller
        name="age"
        control={control}
        rules={{
          required: "Укажите возраст",
          min: { value: 1, message: "Возраст должен быть больше 0" },
          max: { value: 120, message: "Возраст должен быть меньше 120" },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="number"
            label="Возраст"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
    </Box>
  );
};