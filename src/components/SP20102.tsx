import { useState, useEffect } from "react";
import { Button, Label, Flex } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { useEntryDataContext } from "../context/EntryDataContext";

import { SP20102Schema } from "../schemas/SP20102Schema";
import { FormHandler } from "../utils/FormHandler";

// 重要事項確認画面
const SP20102: React.FC = () => {

  const { entryData, setEntryData } = useEntryDataContext();
  const navigate = useNavigate();

  // 成功時の処理をコールバック関数として定義
  const onSuccess = (formValues: Record<string, string>) => {
    setEntryData( { ...formValues, ...entryData});
    navigate("/SP20103");
  };

  const formHandler = new FormHandler(SP20102Schema, onSuccess, entryData!.tenant_id);

  const [formValues, setFormValues] = useState(formHandler.initializeFormValues(entryData || {}));
  const [fieldErrors, setFieldErrors] = useState(formHandler.initializeFieldErrors());
  const [fieldChanges, setFieldChanges] = useState(formHandler.initializeFieldChanges());

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  useEffect(() => {
    // ラジオボタンの値がすべてOKであるかチェック
    const allValuesAreOne = Object.values(formValues).every((value) => ["はい","同意"].includes(value)); 
    setIsNextButtonDisabled(!allValuesAreOne);
  }, [formValues]);

  // フィールドをレンダリングする関数
  const renderField = (fieldName: string) => {
    return formHandler.renderField(
      fieldName,
      formValues,
      fieldChanges,
      fieldErrors,
      (e) => formHandler.handleInputChange(e, setFormValues, setFieldChanges, setFieldErrors)
    );
  };

  // テスト値入力
  const dummyinput = () => {
    setFormValues({
      ...formValues,
      tokutei: "はい",
      konpura: "はい",
      zeisyuhou: "はい",
      zeisyuhoufm: "はい",
      hansya:"同意",
    });
  };

  return (
    <main>
      <h1>重要事項確認画面</h1>
      <div>
        <Label>
         <strong>tenant_id:</strong> {entryData?.tenant_id ?? ""}<br/>
         <strong>tenant_name:</strong> {entryData?.tenant_name ?? ""}<br/>
         <strong>kind:</strong> {entryData?.kind ?? ""}<br/>
        </Label>
        <Flex
          as="form"
          onSubmit={(e) => formHandler.handleSubmit(e, formValues, setFieldChanges, setFieldErrors)}
          direction="column"
          gap="1rem"
          alignItems="flex-start"
        >
          {Object.keys(SP20102Schema.properties).map(renderField)}
          <Button onClick={() => navigate("/?tenant_id=" + entryData?.tenant_id)}>戻る</Button>
          <Button
            type="submit"
            disabled={isNextButtonDisabled}
            style={{
              backgroundColor: isNextButtonDisabled ? "#d3d3d3" : "",
              cursor: isNextButtonDisabled ? "not-allowed" : "pointer"
            }}
          >
            次へ
          </Button>
        </Flex>
        <br/><br/><Button onClick={dummyinput}>テスト値入力</Button>
      </div>
    </main>
  );

}

export default SP20102;
