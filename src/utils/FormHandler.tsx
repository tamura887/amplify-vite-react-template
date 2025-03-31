import { validateAjv } from "./validateAjv";
import { ValidationSchema } from "../schemas/validationSchema";
import { Button, TextField, RadioGroupField, Radio, TextAreaField, SelectField, PasswordField, CheckboxField } from "@aws-amplify/ui-react";
import { tenantConfigs, configType } from "../tenantConfigs/tenantConfigIndex";

export class FormHandler {
  private schema: ValidationSchema;
  private ajv: validateAjv;
  private onSuccess: (formValues: Record<string, string>) => void;
  private tenantConfig:configType;

  constructor(schema: ValidationSchema, onSuccess: (formValues: Record<string, string>) => void, tenant_id: string) {
    this.tenantConfig = tenantConfigs[tenant_id];
    let newRequireds:string[] = [];
    //信金別ファイルで無効な項目は必須項目から除外する
    schema.required.forEach((field)=>{
      const gp = schema.properties[field].group;
      if(gp && this.tenantConfig.visibleFieldGroup[gp as keyof typeof this.tenantConfig.visibleFieldGroup] === false){
        return;
      }
      newRequireds.push(field);      
    });
    schema.required = newRequireds;
    this.schema = schema;

    this.ajv = new validateAjv(schema);
    this.onSuccess = onSuccess; // 成功時のコールバック関数を受け取る
  }

  initializeFormValues(entryData: Record<string, any>): Record<string, string> {
    const fieldNames = Object.keys(this.schema.properties);
    return fieldNames.reduce((acc, field) => {
      const fieldSchema = this.schema.properties[field];
      acc[field] = fieldSchema.uiType === "checkbox" ? "0" : entryData[field] ?? "";
      return acc;
    }, {} as Record<string, string>);
  }

  initializeFieldErrors(): Record<string, string> {
    const fieldNames = Object.keys(this.schema.properties);
    return fieldNames.reduce((acc, field) => {
      acc[field] = "";
      return acc;
    }, {} as Record<string, string>);
  }

  initializeFieldChanges(): Record<string, boolean> {
    const fieldNames = Object.keys(this.schema.properties);
    return fieldNames.reduce((acc, field) => {
      acc[field] = false;
      return acc;
    }, {} as Record<string, boolean>);
  }

  handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    setFormValues: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    setFieldChanges: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    setFieldErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
  ) {
    const { name, value } = e.target;

    setFieldChanges((prev) => ({ ...prev, [name]: true }));
    setFormValues((prev) => {
      const updatedValues = { ...prev, [name]: value };
      setFieldErrors(this.ajv.validate(updatedValues));
      return updatedValues;
    });
  }

  handleSubmit(
    event: React.FormEvent,
    formValues: Record<string, string>,
    setFieldChanges: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    setFieldErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
  ) {
    event.preventDefault();

    // 全フィールドを変更済みにする
    setFieldChanges((prev) => {
      const updatedFieldChanges = { ...prev };
      Object.keys(updatedFieldChanges).forEach((field) => {
        updatedFieldChanges[field] = true;
      });
      return updatedFieldChanges;
    });

    // 入力チェック
    const errors = this.ajv.validate(formValues);
    setFieldErrors(errors);

    if (!Object.values(errors).every((error) => error === "")) {
      console.error("Validation failed", errors);
      alert("エラーがあります。修正してください。");
      return;
    }

    // 入力チェック成功時の処理をコールバック関数で実行
    this.onSuccess(formValues);
  }

  renderField(
    fieldName: string,
    formValues: Record<string, string>,
    fieldChanges: Record<string, boolean>,
    fieldErrors: Record<string, string>,
    handleInputChange: (e: React.ChangeEvent<any>) => void
  ) {
    const field = this.schema.properties[fieldName];

    // 信金別の表示非表示設定
    if (field.group && this.tenantConfig.visibleFieldGroup[field.group as keyof typeof this.tenantConfig.visibleFieldGroup] === false) {
      return null;
    }

    // 無効化条件をスキーマから取得
    const isDisabled = field.disible || (field.dependency && formValues[field.dependency.field] !== field.dependency.value);

    // 必須チェック
    const isRequired = this.schema.required.includes(fieldName);

    const commonProps = {
      label: "",//field.title,
      key: fieldName,
      name: fieldName,
      value: formValues[fieldName],
      onChange: handleInputChange,
      hasError: fieldChanges[fieldName] ? fieldErrors[fieldName] !== "" : false,
      errorMessage: fieldErrors[fieldName],
      isDisabled,
      style: !isDisabled && isRequired ? { background: "pink" } : {},
    };

    let fieldElement;
    switch (field.uiType) {
      case "text":
        fieldElement = <TextField {...commonProps} />;
        break;
      case "textarea":
        fieldElement = <TextAreaField {...commonProps} />;
        break;
      case "radio":
        fieldElement = (
          <RadioGroupField {...commonProps} legend="">
            {field.enum?.map((item) => (
              <Radio key={item} value={item}>
                {item}
              </Radio>
            ))}
          </RadioGroupField>
        );
        break;
      case "select":
        fieldElement = (
          <SelectField {...commonProps}>
            <option></option>
            {(field.enum || field.options)?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
        );
        break;
      case "checkbox":
        fieldElement = (
          <CheckboxField
            {...commonProps}
            checked={formValues[fieldName] === "1"} // チェック状態を反映
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const { name, checked } = e.target;
              const value = checked ? "1" : "0"; // チェック状態を "1" または "0" に変換
              handleInputChange({ ...e, target: { ...e.target, name, value } });
            }}
          />
        );
        break;
      case "password":
        fieldElement = <PasswordField {...commonProps} autoComplete="new-password" />;
        break;
      default:
        fieldElement = <TextField {...commonProps} />;
    }

    let guidanceElements:JSX.Element[] = [];
    
    if(field.guidance){
      field.guidance.forEach((guidance,index) =>{
        guidanceElements[index] =
        <>
          <Button
            style={{
              padding: "0rem",
              fontSize: "0.6rem",
              color: "Blue",
              backgroundColor: "white",
            }}
            onClick={() => alert(guidance?.contents)}
          >
            {guidance.title}
          </Button>
          <br/>
        </>
      });
    }
    return (
      <>
        <hr/>
        {guidanceElements}
        <strong >{field.title}</strong>
        <div style={{fontSize: "0.8rem",color:"red"}}>{!isDisabled && isRequired ? "※必須" : ""}</div>
        {fieldElement}
      </>
    );
  }
}