import { useState, useMemo } from "react";
import { TextField, Button, Label, Flex } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { useEntryDataContext } from "../context/EntryDataContext";
import Ajv from "ajv";
import addFormats from "ajv-formats";

interface ValidationSchema {
  [key: string]: {
    title: string;
    type: string;
    pattern?: string;
    minLength?: number;
    format?: string;
  };
}

// 入力チェック専用の正規表現をまとめるオブジェクト (string型)
const validatePatterns = {
  fullWidth: "^(?:[^\x00-\x7F\uFF61-\uFF9F])+$", // 全角文字のみ
  fullWidthKana: "^(?:[\\u30A0-\\u30FF])+$", // 全角カタカナのみ
  halfWidthAlnumSymbols: "^[\\x21-\\x7E]+$", // 半角英数字記号のみ
  halfWidthNumbers: "^[0-9]+$", // 半角数字のみ
  yyyymmdd: "^(?!\\d{4}(?:02(?:30|31)|(0[469]|11)31))(?!(?:(?:[02468][1235679]|[13579][01345789])00|\\d{2}(?:[02468][1235679]|[13579][01345789]))0229)(\\d{4})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$", //日付形式(yyyymmdd)
};

const validationSchema: { type: string; properties: ValidationSchema; required: string[] } = {
  type: "object",
  properties: {
    kind: {
      title:"申込種別",
      type: "string"
    },
    status: {
      title:"状態",
      type: "string",
      pattern: validatePatterns.halfWidthNumbers, 
    },
    name: { 
      title:"名前",
      type: "string",
      pattern: validatePatterns.fullWidth, 
      minLength: 1,
    },
    birth: {
      title:"誕生日",
      type: "string",
      pattern: validatePatterns.yyyymmdd,
    },
  },
  required: ["kind", "status", "name", "birth"],
};

function Step2() {
  //前画面のデータを引継ぎ
  const { entryData, setEntryData } = useEntryDataContext();
  // フィールド一覧をスキーマから取得
  const fieldNames = Object.keys(validationSchema.properties);
  // 初期値
  const initialFormValues = fieldNames.reduce((acc, field) => {
    // entryDataにプロパティが存在しない場合は空文字
   acc[field] = (entryData as Record<string, any>)?.[field] ?? null;
    return acc;
  }, {} as Record<string, string>);
  const initialFieldErrors = fieldNames.reduce((acc, field) => {
    acc[field] = false; // 全フィールドをエラー無しで初期化
    return acc;
  }, {} as Record<string, boolean>);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [fieldErrors, setFieldErrors] = useState(initialFieldErrors);
  const [fieldChanges, setFieldChanges] = useState(initialFieldErrors);

  // 初回に AJV のコンパイルをする
  const validate = useMemo(() => {
    const ajv = new Ajv({allErrors: true });
    addFormats(ajv);
    return ajv.compile(validationSchema);
  }, []);  

  const navigate = useNavigate();

  // 個別チェック
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFieldChanges({ ...fieldChanges, [name]: true });
    let inputingValues = { ...formValues, [name]: value };
    setFormValues(inputingValues);
    validateAndSetError(inputingValues);
  };

  const validateAndSetError = (inputingValues: {[key: string]: any;}): boolean => {
    const validatedValues = Object.keys(inputingValues).reduce((acc, key) => {
      // 必須チェックを発動させるため空文字は定義なしとする
      if (validationSchema.required.includes(key) && inputingValues[key] === "") {
        return acc;
      }
      let val = inputingValues[key];
      acc[key] = val;
      return acc;
    }, {} as Record<string, any>);

    const valid = validate(validatedValues);

    const newFieldErrors = fieldNames.reduce((acc, field) => {
      acc[field] = validate.errors?.some((error) => 
        error.instancePath === `/${field}` || 
        (error.keyword === "required" && error.params.missingProperty === field)
      ) || false;
      return acc;
    }, {} as Record<string, boolean>);

    setFieldErrors(newFieldErrors);
    return valid;
  }

  // 全体チェック
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFieldChanges({ ...fieldChanges, ...fieldNames.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Record<string, boolean>) });

    const valid = validateAndSetError(formValues);

    if (valid) {
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
      alert("エラーがあります。修正してください。");
    }
  };

  //　エラーメッセージ作成
  const createErrorMessage = (fieldName: string) => {
    const error = validate.errors?.find((error) => error.instancePath === `/${fieldName}` || error.params.missingProperty === fieldName);
    if (error) {
      let prop = validationSchema.properties[fieldName];
      switch (error.keyword) {
        case "required":
          return `${prop.title}を入力して下さい。`;
        case "minLength":
          return `${prop.title}は${prop.minLength}文字以上で入力してください。`;
        case "pattern":
          switch (error.params.pattern) {
            case validatePatterns.fullWidth:
              return `${prop.title}は全角文字で入力してください。`;
            case validatePatterns.fullWidthKana:
              return `${prop.title}は全角カタカナで入力してください。`;
            case validatePatterns.halfWidthAlnumSymbols:
              return `${prop.title}は半角英数字記号で入力してください。`;
            case validatePatterns.halfWidthNumbers:
              return `${prop.title}は半角数字で入力してください。`;
              case validatePatterns.yyyymmdd:
                return `${prop.title}は日付形式(yyyymmdd)で入力してください。`;
              default:
              return `${prop.title}の入力が正しくありません。`;
          }
        default:
          return `${prop.title}の入力が正しくありません。`;
      }
    }
    return "";
  }

  return (
    <main>
      <h1>Entry Data</h1>
      <Label>
        <strong>Tenant ID:</strong> {entryData?.tenant_id ?? ""}
      </Label>
      <Flex as="form" onSubmit={handleSubmit} direction="column" gap="1rem" alignItems="flex-start">
      {fieldNames.map((fieldName) => (
        <TextField
          key={fieldName}
          label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} // フィールド名をタイトル化
          name={fieldName}
          value={formValues[fieldName]}
          onChange={handleInputChange}
          hasError={fieldChanges[fieldName] ? fieldErrors[fieldName] : false}
          errorMessage={fieldErrors[fieldName] ? createErrorMessage(fieldName) : ""}
        />
      ))}
      <Button type="submit">送信</Button>
    </Flex>
    </main>
  );
}

export default Step2;
