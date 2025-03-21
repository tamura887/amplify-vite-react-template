export interface ValidationSchema {
  [key: string]: {
    title: string;
    type: string;
    pattern?: string;
    minLength?: number;
    format?: string;
  };
}

// 入力チェック専用の正規表現をまとめるオブジェクト (string型)
export const validatePatterns = {
  fullWidth: "^(?:[^\x00-\x7F\uFF61-\uFF9F])+$", // 全角文字のみ
  fullWidthKana: "^(?:[\\u30A0-\\u30FF])+$", // 全角カタカナのみ
  halfWidthAlnumSymbols: "^[\\x21-\\x7E]+$", // 半角英数字記号のみ
  halfWidthNumbers: "^[0-9]+$", // 半角数字のみ
  yyyymmdd: "^(?!\\d{4}(?:02(?:30|31)|(0[469]|11)31))(?!(?:(?:[02468][1235679]|[13579][01345789])00|\\d{2}(?:[02468][1235679]|[13579][01345789]))0229)(\\d{4})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$", //日付形式(yyyymmdd)
};

export const validationSchema: { type: string; properties: ValidationSchema; required: string[] } = {
  type: "object",
  properties: {
    kind: {
      title: "申込種別",
      type: "string"
    },
    status: {
      title: "状態",
      type: "string",
      pattern: validatePatterns.halfWidthNumbers,
    },
    name: {
      title: "名前",
      type: "string",
      pattern: validatePatterns.fullWidth,
      minLength: 1,
    },
    birth: {
      title: "誕生日",
      type: "string",
      pattern: validatePatterns.yyyymmdd,
    },
  },
  required: ["kind", "status", "name", "birth"],
};