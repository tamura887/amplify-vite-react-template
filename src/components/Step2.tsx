import { useState } from "react";
import { TextField, Button, Label, Flex } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { useEntryDataContext } from "../context/EntryDataContext";
import { validationSchema } from "../schemas/validationSchema";
import { validateAjv } from "../utils/validateAjv";


function Step2() {
  //前画面のデータを引継ぎ
  const { entryData, setEntryData } = useEntryDataContext();
  // フィールド一覧をスキーマから取得
  const fieldNames = Object.keys(validationSchema.properties);
  // 初期値
  const initialFormValues = fieldNames.reduce((acc, field) => {
    // entryDataにプロパティが存在しない場合は空文字
   acc[field] = (entryData as Record<string, any>)?.[field] ?? "";
    return acc;
  }, {} as Record<string, string>);
  const initialFieldErrors = fieldNames.reduce((acc, field) => {
    acc[field] = ""; // 全フィールドをエラー無しで初期化
    return acc;
  }, {} as Record<string, string>);
  const initialFieldChanges= fieldNames.reduce((acc, field) => {
    acc[field] = false // 全フィールドを変更無しで初期化
    return acc;
  }, {} as Record<string, boolean>);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [fieldErrors, setFieldErrors] = useState(initialFieldErrors);
  const [fieldChanges, setFieldChanges] = useState(initialFieldChanges);
  const navigate = useNavigate();

  // 個別チェック
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFieldChanges({ ...fieldChanges, [name]: true });
    let inputingValues = { ...formValues, [name]: value };
    setFormValues(inputingValues);
    setFieldErrors(validateAjv(inputingValues));
  };

  // 全体チェック
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 全フィールドを変更済みにする
    setFieldChanges({ ...fieldChanges, ...fieldNames.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Record<string, boolean>) });

    setFieldErrors(validateAjv(formValues));

    if (Object.values(fieldErrors).every(error => error === "")) {
      alert("フォーム送信成功！");
      if (entryData) {
        setEntryData({ 
          ...entryData, 
          ...formValues, 
          tenant_id: entryData.tenant_id ?? "", 
          tran_id: entryData.tran_id ?? "" 
        });
      }
      navigate("/step3");
    } else {
      console.error("Validation failed", fieldErrors);
      alert("エラーがあります。修正してください。");
    }
  };

  return (
    <main>
      <h1>Entry Data</h1>
      <Label>
        <strong>tenant_id:</strong> {entryData?.tenant_id ?? ""}
      </Label>
      <Label>
        <strong>tran_id:</strong> {entryData?.tran_id ?? ""}
      </Label>
      <Flex as="form" onSubmit={handleSubmit} direction="column" gap="1rem" alignItems="flex-start">
      {fieldNames.map((fieldName) => (
        <TextField
          key={fieldName}
          label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} // フィールド名をタイトル化
          name={fieldName}
          value={formValues[fieldName]}
          onChange={handleInputChange}
          hasError={fieldChanges[fieldName] ? fieldErrors[fieldName] !== "" : false}
          errorMessage={fieldErrors[fieldName]}
        />
      ))}
      <Button type="submit">送信</Button>
    </Flex>
    </main>
  );
}

export default Step2;
