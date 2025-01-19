import React, { useEffect } from "react";
import { Box, FormLabel, Button, TextareaAutosize, RadioGroup, FormControlLabel, Radio, Checkbox, FormControl, FormGroup } from "@mui/material";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import { drugNames } from "../../drugNames";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3/AdapterDateFnsV3";
import { ru } from "date-fns/locale/ru";

interface FormData {
  sideEffects: {
    // drugName: { value: string; label: string } | null;
    sideEffectDescription: string;
    sideEffectStartDate: Date | null;
    sideEffectStatus: string;
    sideEffectEndDate: Date | null;
  }[];
  consequences: Record<string, boolean>;
}

export const Step4: React.FC = () => {
  const { control } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sideEffects",
  });


  // Добавляем первый элемент по умолчанию, если список пуст
  useEffect(() => {
    if (fields.length === 0) {
      append({ sideEffectDescription: "", sideEffectStartDate: null, sideEffectStatus: "", sideEffectEndDate: null }); // Добавляем первый обязательный элемент
    }
  }, []);

  return (
    <Box>
      <h1 className="text-3xl font-thin">Какой побочный эффект отмечался у пациента?</h1>
      <p className="opacity-50">
        Пожалуйста, укажите побочные эффекты или описание одного случая, связанного с безопасностью препарата.
      </p>

      {fields.map((item, index) => (
        <Box key={item.id} className="mt-4 flex items-start gap-4 border p-2 rounded relative max-md:flex-col">
          <Controller
            name={`sideEffects.${index}.sideEffectDescription`}
            control={control}
            rules={{ required: "Пожалуйста опишите побочный эффект" }}
            render={({ field, fieldState }) => (
              <div>
                <TextareaAutosize
                  {...field}
                  className="max-w-[400px] w-full p-4 border rounded"
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Укажите показание, по которому был назначен препарат Лундбек (причина назначения)"
                />
                {fieldState.error && <p className="text-[#d32f2f]">{fieldState.error.message}</p>}
              </div>
            )}
          />
          <Controller
            name={`sideEffects.${index}.sideEffectStartDate`}
            control={control}
            render={({ field, fieldState }) => (
              <>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                  <DatePicker
                    {...field}
                    className="md:max-w-[400px] w-full"
                    label="Дата начала побочного эффекта?"
                    onChange={(date) => field.onChange(date)} // обязательно для работы react-hook-form
                  />
                </LocalizationProvider>
              </>
            )}
          />
          <div className="">
            <Controller
              name={`sideEffects.${index}.sideEffectStatus`}
              control={control}
              render={({ field, fieldState }) => (
                <div className="">
                  <FormLabel error={!!fieldState.error} id="periodicity">Каков статус побочного эффекта?</FormLabel>
                  <RadioGroup name="periodicity">
                    <FormControlLabel {...field} value="Разрешился" control={<Radio checked={field.value === "Разрешился"} style={{ padding: "0 8px 0 8px" }} />} label="Разрешился" />
                    <FormControlLabel {...field} value="В процессе разрешения" control={<Radio checked={field.value === "В процессе разрешения"} style={{ padding: "0 8px 0 8px" }} />} label="В процессе разрешения" />
                    <FormControlLabel {...field} value="Не разрешился" control={<Radio checked={field.value === "Не разрешился"} style={{ padding: "0 8px 0 8px" }} />} label="Не разрешился" />
                  </RadioGroup>
                  {fieldState.error && <p className="text-[#d32f2f]">{fieldState.error.message}</p>}
                </div>
              )}
            />
          </div>
          <Controller
            name={`sideEffects.${index}.sideEffectEndDate`}
            control={control}
            render={({ field, fieldState }) => (
              <>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                  <DatePicker
                    {...field}
                    className="md:max-w-[400px] w-full"
                    label="Если разрешился, укажите дату окончания"
                    onChange={(date) => field.onChange(date)} // обязательно для работы react-hook-form
                  />
                </LocalizationProvider>
              </>
            )}
          />
          {index !== 0 && ( // Кнопка удаления недоступна для первого элемента
            <div className="absolute bottom-2 right-2 max-md:relative max-md:m-2">
              <Button
                variant="outlined"
                color="error"
                onClick={() => remove(index)}
                style={{ marginTop: "10px" }}
              >
                Удалить
              </Button>
            </div>
          )}
        </Box>
      ))}

      <Button
        variant="contained"
        color="primary"
        onClick={() => append({ sideEffectDescription: "", sideEffectStartDate: null, sideEffectStatus: "", sideEffectEndDate: null })}
        style={{ marginTop: "20px" }}
      >
        Добавить побочный эффект
      </Button>




      <FormControl sx={{ my: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Вследствие побочного эффекта:</FormLabel>
        <Controller
          name="consequences.one"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value} // Привязываем значение checkbox
                  />
                }
                label="Потребовалась госпитализация?"
              />
            </>
          )}
        />
        <Controller
          name="consequences.two"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value} // Привязываем значение checkbox
                  />
                }
                label="Была отмечена утрата трудоспособности (физическое или психическое нарушение, которое оказало значимое и долгосрочное негативное влияние на способность ежедневно функционировать)?"
              />
            </>
          )}
        />
        <Controller
          name="consequences.three"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value} // Привязываем значение checkbox
                  />
                }
                label="Пациент умер или перенес угрожающее жизни состояние?"
              />
            </>
          )}
        />
      </FormControl>

    </Box>
  );
};