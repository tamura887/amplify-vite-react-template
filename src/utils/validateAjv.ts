import { validatePatterns, ValidationSchema } from "@schemas/validationSchema";
import Ajv, { ErrorObject,ValidateFunction  } from "ajv";
import addFormats from "ajv-formats";
import addKeywords from "ajv-keywords";

export class validateAjv {

  validateFnction: ValidateFunction ;
  validationSchema: ValidationSchema;

  constructor(validationSchema: ValidationSchema) {
    const ajv = new Ajv({ allErrors: true, $data: true }); 
    addKeywords(ajv); // Add additional keywords like $data
    addFormats(ajv);
    // カスタムキーワード "uiType" を登録
    ajv.addKeyword("uiType");
    ajv.addKeyword("options");
    ajv.addKeyword("disible");
    ajv.addKeyword("dependency");
    ajv.addKeyword("guidance");
    ajv.addKeyword("group");
    this.validateFnction = ajv.compile(validationSchema);
    this.validationSchema = validationSchema;
  }

  public validate(inputingValues: {[key: string]: any;}): Record<string, string> {
    const validatedValues = Object.keys(inputingValues).reduce((acc, key) => {
      // 必須チェックを発動させるため空文字は定義なしとする
      if (inputingValues[key] === "") {
        return acc;
      }
      let val = inputingValues[key];
      acc[key] = val;
      return acc;
    }, {} as Record<string, any>);
    
    this.validateFnction(validatedValues);
    console.dir(this.validateFnction.errors);
  
    const newFieldErrors = Object.keys(this.validationSchema.properties).reduce((acc, field) => {
      const error = this.validateFnction.errors?.find((error) => error.instancePath === `/${field}` || error.params.missingProperty === field);
      acc[field] = this.createErrorMessage(error, field);
      return acc;
    }, {} as Record<string, string>);
  
    return newFieldErrors;
  }

  private createErrorMessage(error: ErrorObject<string, Record<string, any>, unknown> | undefined, fieldName: string){
    if (error) {
      let prop = this.validationSchema.properties[fieldName];
      switch (error.keyword) {
        case "const":
          if(error.schemaPath.includes("anyOf")){
            return `いずれかを選択してください。`;
          }else{
            return `${prop.title}が一致していません。`;
          }
        case "required":
          return `${prop.title}を入力して下さい。`;
        case "minLength":
          return `${prop.title}は${prop.minLength}文字以上で入力してください。`;
        case "maxLength":
          return `${prop.title}は${prop.maxLength}文字以下で入力してください。`;
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

}



