import { useState, useEffect } from "react";
import { Button, Label, Flex ,RadioGroupField, Radio } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { useEntryDataContext } from "../context/EntryDataContext";

import { SP20102Schema } from "../schemas/SP20102Schema";
import { FormHandler } from "../utils/FormHandler";

// 重要事項確認画面
const SP20102: React.FC = () => {

  // //前画面のデータを引継ぎ
  // const { entryData } = useEntryDataContext();
  // const navigate = useNavigate();

  // const radioItems: { [key: string]: { title: string; option: { value: string; label: string; }[]; guidance: string; } } = {
  //   "tokutei": {
  //     title:"特定取引",
  //     option: [
  //       { value: "1", label: "はい" },
  //       { value: "2", label: "いいえ" },  
  //     ],
  //     guidance:"説明"
  //   },
  //   "konpura": {
  //     title:"コンプラ",
  //     option: [
  //       { value: "1", label: "はい" },
  //       { value: "2", label: "いいえ" },  
  //     ],
  //     guidance:"説明"
  //   },
  //   "zeisyuhou": {
  //     title:"犯収法",
  //     option: [
  //       { value: "1", label: "はい" },
  //       { value: "2", label: "いいえ" },  
  //     ],
  //     guidance:"職務一覧"
  //   },
  //   "zeisyuhoufm": {
  //     title:"犯収法家族の範囲",
  //     option: [
  //       { value: "1", label: "はい" },
  //       { value: "2", label: "いいえ" },  
  //     ],
  //     guidance:"家族の範囲"
  //   },
  //   "hansya": {
  //     title:"反社",
  //     option: [
  //       { value: "1", label: "同意" },
  //       { value: "2", label: "不同意" },  
  //     ],
  //     guidance:"説明"
  //   }

  // };

  // // ラジオボタンの状態を管理
  // const initialRadioValues = Object.keys(radioItems).reduce((acc, key) => {
  //   acc[key] = "";
  //   return acc;
  // }, {} as { [key: string]: string });

  // const [radioValues, setRadioValues] = useState<{ [key: string]: string }>(initialRadioValues);
  // const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  // useEffect(() => {
  //   // ラジオボタンの値がすべて"1"であるかをチェック
  //   const allValuesAreOne = Object.values(radioValues).every(value => value === "1");
  //   setIsNextButtonDisabled(!allValuesAreOne);
  // }, [radioValues]);

  // // ラジオボタンの値を更新
  // const handleRadioChange = (fieldName: string, value: string) => {
  //   setRadioValues(prevValues => ({
  //     ...prevValues,
  //     [fieldName]: value
  //   }));
  // };

  // //　説明
  // const handleClick = (key:string) => {
  //   alert(key+"の説明");
  // };

  // // 次へ
  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   navigate("/SP20103");
  // };

//   return (
//     <main>
//       <h1>重要事項確認画面</h1>
//       <Label>
//         <strong>tenant_id:</strong> {entryData?.tenant_id ?? ""}<br/>
//         <strong>tenant_name:</strong> {entryData?.tenant_name ?? ""}<br/>
//         <strong>kind:</strong> {entryData?.kind ?? ""}<br/>
//       </Label>
//       <div style={{ maxHeight: "640px", overflowY: "auto" , width: "480px"}}>
//         <Flex as="form" onSubmit={handleSubmit} direction="column" gap="1rem" alignItems="flex-start">
//           {Object.keys(radioItems)
//           .map((fieldName: string) => {
//               return (
//                 <RadioGroupField
//                   key={fieldName}
//                   legend={radioItems[fieldName].title}
//                   name={fieldName}
//                   value={radioValues[fieldName] || ""}
//                   onChange={(e) => handleRadioChange(fieldName, e.target.value)}
//                 >
//                   {radioItems[fieldName].option.map((item) => (
//                     <Radio key={item.value} value={item.value}>
//                       {item.label}
//                     </Radio>
//                   ))}
//                   <Button type="button" onClick={() => handleClick(radioItems[fieldName].title)}>{radioItems[fieldName].guidance}</Button>
//                 </RadioGroupField>
//               );
//           }
//           )}
//           <Button onClick={() => navigate("/?tenant_id="+entryData?.tenant_id)}>
//             戻る
//           </Button>
//           <Button
//             type="submit"
//             disabled={isNextButtonDisabled}
//             style={{
//               backgroundColor: isNextButtonDisabled ? "#d3d3d3" : "",
//               cursor: isNextButtonDisabled ? "not-allowed" : "pointer"
//             }}
//           >
//             次へ
//           </Button>
//         </Flex>
//     </div>
//     </main>
//   );

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
