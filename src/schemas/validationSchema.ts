export interface ValidationSchema {
  type: string;
  properties: {
    [key: string]: {
      title?: string;
      type?: string;
      maxLength?: number;
      minLength?: number;
      pattern?: string;
      uiType?: string;
      options?: string[];
      enum?: string[];      
      disible?: boolean;
      dependency?: { field: string; value: string };
      guidance?: { title: string; contents: string }[];
      group?: string;
    };
  };
  required: string[];
  allOf?: Array<{
    if?: {
      required?: string[];
      properties: {
        [key: string]: {
          const: string;
        };
      };
    };
    then?: {
      required?: string[];
      anyOf?: Array<{
        required: string[];
      }>;
    };
    else?: {
      required?: string[];
    };
    properties?: {
      [key: string]: {
        type?: string;
        const?: string | { $data: string };
      };
    };
    required?: string[];
    anyOf?: Array<{
      properties: {
        [key: string]: {
          const: string;
        };
      };
    }>;
  }>;
}

// 入力チェック専用の正規表現をまとめるオブジェクト (string型)
export const validatePatterns = {
  fullWidth: "^(?:[^\x00-\x7F\uFF61-\uFF9F])+$", // 全角文字のみ
  fullWidthKana: "^(?:[\\u30A0-\\u30FF])+$", // 全角カタカナのみ
  halfWidthAlnumSymbols: "^[\\x21-\\x7E]+$", // 半角英数字記号のみ
  email: "^(?!@)[\\x21-\\x7E]*@[\\x21-\\x7E]+(?!@)$", // メール形式
  halfWidthNumbers: "^[0-9]+$", // 半角数字のみ
  yyyymmdd: "^(?!\\d{4}(?:02(?:30|31)|(0[469]|11)31))(?!(?:(?:[02468][1235679]|[13579][01345789])00|\\d{2}(?:[02468][1235679]|[13579][01345789]))0229)(\\d{4})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$", //日付形式(yyyymmdd)
};
