import { useState } from "react";
import { Label, Button, Flex} from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { useEntryDataContext } from "../context/EntryDataContext";
import { SP20301Schema } from "@schemas/SP20301Schema";
import { FormHandler } from "../utils/FormHandler";

function SP20301() {
  const { entryData, setEntryData } = useEntryDataContext();
  const navigate = useNavigate();

  // 成功時の処理をコールバック関数として定義
  const onSuccess = (formValues: Record<string, string>) => {
    setEntryData( { ...formValues, ...entryData});
    navigate("/SP20302");
  };

  const formHandler = new FormHandler(SP20301Schema, onSuccess, entryData!.tenant_id);

  const [formValues, setFormValues] = useState(formHandler.initializeFormValues(entryData || {}));
  const [fieldErrors, setFieldErrors] = useState(formHandler.initializeFieldErrors());
  const [fieldChanges, setFieldChanges] = useState(formHandler.initializeFieldChanges());

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
      name_kana: "テストタロウ",
      gender: "男性",
      phone_mobile_SMS: "09012345678",
      shop_code:"999",
      account_kind:"普通",
      account_number:"1234567",
      zipcode: "1234567",
      address_kana: "テスト市テスト区テスト町",
      job:"会社員・団体職員",

    });
  };

  return (
    <main>
      <h1>内容変更入力</h1>
      <div>
        <Label>
          <strong>tenant_id:</strong> {entryData!.tenant_id}<br/>
          <strong>tenant_name:</strong> {entryData!.tenant_name}<br/>
          <strong>tran_id:</strong> {entryData!.tran_id}<br/>
          <strong>kind:</strong> {entryData!.kind}<br/>
        </Label>
        <Flex
          as="form"
          onSubmit={(e) => formHandler.handleSubmit(e, formValues, setFieldChanges, setFieldErrors)}
          direction="column"
          gap="1rem"
          alignItems="flex-start"
        >
          {Object.keys(SP20301Schema.properties).map(renderField)}
          <Button onClick={() => navigate("/?tenant_id=" + entryData?.tenant_id)}>キャンセル</Button>
          <Button type="submit">次へ</Button>
        </Flex>
        <br/><br/><Button onClick={dummyinput}>テスト値入力</Button>
      </div>
    </main>
  );
}

export default SP20301;