import { validatePatterns, validationSchema } from "../schemas/validationSchema";
import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";


const fieldNames = Object.keys(validationSchema.properties);

export const validateAjv = (inputingValues: {[key: string]: any;}): Record<string, string> => {
  const validatedValues = Object.keys(inputingValues).reduce((acc, key) => {
    // 必須チェックを発動させるため空文字は定義なしとする
    if (validationSchema.required.includes(key) && inputingValues[key] === "") {
      return acc;
    }
    let val = inputingValues[key];
    acc[key] = val;
    return acc;
  }, {} as Record<string, any>);

  const ajv = new Ajv({allErrors: true });
  addFormats(ajv);
  const validate = ajv.compile(validationSchema);
  validate(validatedValues);

  const newFieldErrors = fieldNames.reduce((acc, field) => {
    const error = validate.errors?.find((error) => error.instancePath === `/${field}` || error.params.missingProperty === field);
    acc[field] = createErrorMessage(error, field);
    return acc;
  }, {} as Record<string, string>);

  return newFieldErrors;
}

const createErrorMessage = (error: ErrorObject<string, Record<string, any>, unknown> | undefined, fieldName: string) => {
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