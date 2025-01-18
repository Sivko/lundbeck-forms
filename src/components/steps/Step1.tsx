import { Box, MenuItem, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface FormData {
  name: string;
  contactMethod: "email" | "phone";
  contactValue: string;
  age: number;
}

export const Step1: React.FC = () => {
  const { control, watch } = useFormContext<FormData>();
  const contactMethod = watch("contactMethod");

  return (
    <Box>
      <Controller
        name="name"
        control={control}
        rules={{ required: "Имя обязательно" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Имя"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="contactMethod"
        control={control}
        rules={{ required: "Выберите способ связи" }}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Способ связи"
            fullWidth
            margin="normal"
          >
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="phone">Телефон</MenuItem>
          </TextField>
        )}
      />
      <Controller
        name="contactValue"
        control={control}
        rules={{
          required: "Заполните это поле",
          pattern: {
            value:
              contactMethod === "email"
                ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                : /^[0-9]{10,15}$/,
            message:
              contactMethod === "email"
                ? "Введите корректный email"
                : "Введите корректный номер телефона",
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label={contactMethod === "email" ? "Email" : "Телефон"}
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
