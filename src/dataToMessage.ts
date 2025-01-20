export interface DataToSend {
  isCommunication: string;
  contactMethod: "email" | "phone";
  phone: string;
  email: string;
  isPatient: string;
  agent: string;
  country: {};
  isLundbeckDrugPurchase: string;
  sideEffectCountry: {};
  gender: string;
  isPregnant: string;
  dateOfBirth: Date | null;
  weekOfBirth: number | null;
  description: string;
  age: number | string;
  drugItems: {
    drugName: {};
    drugNumber: string;
    purposeDrug: string;
    periodicity: string;
    dose: string;
    customPeriodicity: string;
    startDate: Date | null;
    isContinuePurpose: string;
    endDate: Date | null;
  }[];
  sideEffects: {
    sideEffectDescription: string;
    sideEffectStartDate: Date | null;
    sideEffectStatus: string;
    sideEffectEndDate: Date | null;
  }[];
  consequences: Record<string, boolean>;
  ateMedicine: string;
  anyDrugs: {
    name: string;
    reason: string;
    dose: string;
    dateStart: Date | null;
    isContinue: string;
    additionalDrugs: string;
    dateEnd: Date | null;
  }[];
  disease: string;
  diseasesItems: {
    name: string;
    dateStart: Date | null;
    status: string;
    isTreatment: string;
    treatmentDescription: string;
  }[];
}

export default function generateEmailContent(data: DataToSend): string {
  const drugItemsContent = data.drugItems
    .map(
      (item, index) => `
    Препарат ${index + 1}:
      - Название: ${item.drugName ? JSON.stringify(item.drugName) : "не указано"}
      - Номер: ${item.drugNumber || "не указано"}
      - Показание: ${item.purposeDrug || "не указано"}
      - Периодичность: ${item.periodicity} (${item.customPeriodicity || "не указано"})
      - Дозировка: ${item.dose || "не указано"}
      - Начало приема: ${item.startDate || "не указано"}
      - Продолжается ли прием: ${item.isContinuePurpose || "не указано"}
      - Дата окончания: ${item.endDate || "не указано"}`
    )
    .join("\n");

  const sideEffectsContent = data.sideEffects
    .map(
      (effect, index) => `
    Побочный эффект ${index + 1}:
      - Описание: ${effect.sideEffectDescription || "не указано"}
      - Дата начала: ${effect.sideEffectStartDate || "не указано"}
      - Статус: ${effect.sideEffectStatus || "не указано"}
      - Дата окончания: ${effect.sideEffectEndDate || "не указано"}`
    )
    .join("\n");

  const anyDrugsContent = data.anyDrugs
    .map(
      (drug, index) => `
    Другой препарат ${index + 1}:
      - Название: ${drug.name || "не указано"}
      - Показание: ${drug.reason || "не указано"}
      - Доза: ${drug.dose || "не указано"}
      - Начало приема: ${drug.dateStart || "не указано"}
      - Продолжается ли прием: ${drug.isContinue || "не указано"}
      - Дополнительные препараты: ${drug.additionalDrugs || "не указано"}
      - Дата окончания: ${drug.dateEnd || "не указано"}`
    )
    .join("\n");

  const diseasesContent = data.diseasesItems
    .map(
      (disease, index) => `
    Заболевание ${index + 1}:
      - Название: ${disease.name || "не указано"}
      - Дата начала: ${disease.dateStart || "не указано"}
      - Статус: ${disease.status || "не указано"}
      - Проводилось лечение: ${disease.isTreatment || "не указано"}
      - Описание лечения: ${disease.treatmentDescription || "не указано"}`
    )
    .join("\n");

  return `
  Данные формы:
    - Согласие на связь: ${data.isCommunication || "не указано"}
    - Способ связи: ${data.contactMethod || "не указано"}
    - Телефон: ${data.phone || "не указано"}
    - Email: ${data.email || "не указано"}
    - Является пациентом: ${data.isPatient || "не указано"}
    - Связь с пациентом: ${data.agent || "не указано"}
    - Страна: ${JSON.stringify(data.country)}
    - Препарат Лундбек приобретен в той же стране: ${data.isLundbeckDrugPurchase || "не указано"}
    - Страна возникновения побочного эффекта: ${data.sideEffectCountry ? JSON.stringify(data.sideEffectCountry) : "не указано"}
    - Пол: ${data.gender || "не указано"}
    - Беременность: ${data.isPregnant || "не указано"}
    - Дата родов: ${data.dateOfBirth || "не указано"}
    - Неделя родов: ${data.weekOfBirth || "не указано"}
    - Возраст: ${data.age || "не указано"}
    - Описание беременности: ${data.description || "не указано"}
    - Принимал другие препараты: ${data.ateMedicine || "не указано"}
    - Хотите сообщить о других заболеваниях: ${data.disease || "не указано"}

  Препараты:
  ${drugItemsContent}

  Побочные эффекты:
  ${sideEffectsContent}

  Другие препараты:
  ${anyDrugsContent}

  Заболевания:
  ${diseasesContent}
  `;
}