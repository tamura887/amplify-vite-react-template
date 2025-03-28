import { validatePatterns, ValidationSchema } from "./validationSchema";

export const SP20301Schema: ValidationSchema = {
  type: "object",
  properties: {
    change_address: {
      title: "変更事項：住所変更",
      type: "string",
      uiType: "checkbox",
    },
    change_phone: {
      title: "変更事項：電話番号変更",
      type: "string",
      uiType: "checkbox",
    },
    name: {
      title: "名前",
      type: "string",
      maxLength: 40,
      uiType: "text",
    },
    name_kana: {
      title: "名前（フリガナ）",
      type: "string",
      maxLength: 50,
      uiType: "text",
    },
    birth: {
      title: "生年月日",
      type: "string",
      maxLength: 8,
      minLength: 8,
      pattern: validatePatterns.halfWidthAlnumSymbols,
      uiType: "text",
    },
    gender: {
      title: "性別",
      type: "string",
      uiType: "radio", // ラジオボタン
      enum: ["男性", "女性", "回答しない"], // 選択肢を定義
    },
    phone_mobile_SMS: {
      title: "SMS用携帯電話番号",
      type: "string",
      maxLength: 11,
      minLength: 11,
      pattern: validatePatterns.halfWidthNumbers,
      uiType: "text",
    },
    shop_code: {
      title: "支店番号",
      type: "string",
      minLength: 3,
      maxLength: 3,
      pattern: validatePatterns.halfWidthNumbers,
      uiType: "text",
      group:"account_details",
    },
    account_kind: {
      title: "科目",
      type: "string",
      uiType: "select", // セレクトボックス
      enum: ["普通", "当座", "貯蓄", "その他"], // 選択肢を定義
      group:"account_details",
    },
    account_number: {
      title: "口座番号",
      type: "string",
      minLength: 7,
      maxLength: 8,
      pattern: validatePatterns.halfWidthNumbers,
      uiType: "text",
      group:"account_details",
    },
    zipcode: {
      title: "郵便番号",
      type: "string",
      maxLength: 7,
      minLength: 7,
      pattern: validatePatterns.halfWidthNumbers,
      uiType: "text",
      dependency: { field: "change_address", value: "1" },
    },
    address: {
      title: "住所",
      type: "string",
      maxLength: 50,
      uiType: "text",
    },
    address_kana: {
      title: "住所（カナ）",
      type: "string",
      maxLength: 100,
      uiType: "text", 
    },
    phone_mobile_new: {
      title: "変更後携帯電話番号",
      type: "string",
      minLength: 11,
      maxLength: 11,
      pattern: validatePatterns.halfWidthNumbers,
      uiType: "text",
      dependency: { field: "change_phone", value: "1" }, // 依存条件
    },
    phone_home_new: {
      title: "変更後自宅電話番号",
      type: "string",
      minLength: 10,
      maxLength: 11,
      pattern: validatePatterns.halfWidthNumbers,
      uiType: "text", 
      dependency: { field: "change_phone", value: "1" },      
    },
    job: {
      title: "ご職業",
      type: "string",
      uiType: "select",
      options: [
        "個人事業主・自営業",
        "会社役員・団体役員",
        "会社員・団体職員",
        "公務員",
        "パート・アルバイト",
        "派遣・嘱託・契約社員",
        "専従者",
        "主婦・主夫",
        "学生",
        "年金受給者",
        "退職された方・無職の方",
        "その他",
      ],
      guidance:[
        {
          title:"ご職業の補足説明",
          contents:"ご職業について\n\n・学生の方で、アルバイトをされている方は、【パート・アルバイト】をご選択いただき、ご勤務先の名称をご記入ください。\n\n・【退職された方・無職の方】とは、お勤めされておらず、かつ【主婦・主夫】【学生】【年金受給者】にも該当しない方となります。（家事手伝いの方・未就学児の方等）"
        }
      ],
      group:"job",
    },
    job_etc: {
      title: "ご職業その他",
      type: "string",
      maxLength: 30,
      uiType: "text",
      dependency: { field: "job", value: "その他" }, // 依存条件
      group:"job",
    },
    industry: {
      title: "業種",
      type: "string",
      uiType: "select", // セレクトボックス
      options: [
        "農業",
        "林業",
        "漁業",
        "建設業",
        "通信業",
        "運輸業",
        "古物商",
        "美術商",
        "両替商",
        "質屋",
        "保険業",
        "貸金業",
        "不動産業",
        "飲食業",
        "宿泊業",
        "医療保険業",
        "貿易業",
        "娯楽業",
        "農畜産物・水産物卸業",
        "食料・飲料卸業",
        "貴金属・宝石等取扱業",
        "衣料品等取扱業",
        "自動車小売業",
        "中古自動車小売業",
        "金融商品取引業",
        "教育学習支援業",
        "廃棄物処理業",
        "電話受付代行業",
        "自動車整備業",
        "洗濯・理容・浴場等業",
        "弁護士・司法書士・行政書士・公認会計士・税理士",
        "その他",
      ], // カスタム属性で選択肢を定義
      group:"job",
    },
    industry_etc: {
      title: "業種その他",
      type: "string",
      maxLength: 30,
      dependency: { field: "industry", value: "その他" }, // 依存条件
      group:"job",
    },
    office_name: {
      title: "勤務先・学校名称",
      type: "string",
      maxLength: 40,
      group:"job",
    },
    office_kana: {
      title: "勤務先・学校名称（カナ）",
      type: "string",
      maxLength: 50,
      group:"job",
    },
    office_phone: {
      title: "勤務先・学校電話番号",
      type: "string",
      minLength: 10,
      maxLength: 11,
      pattern: validatePatterns.halfWidthNumbers,
      group:"job",
    },
  },
  required: ["name","name_kana", "birth", "gender","phone_mobile_SMS","shop_code","account_kind","account_number","zipcode","address","job"],
  allOf: [
    {
      anyOf: [
        {
          properties: {
            change_address: { const: "1" },
          },
        },
        {
          properties: {
            change_phone: { const: "1" },
          },
        },
      ],
    },
    {
      if: {
        required: ["change_address"],
        properties: {
          change_address: { const: "1" }
        }
      },
      then: {
        required: ["address_kana"]
      }
    },
    {
      if: {
        required: ["change_phone"],
        properties: {
          change_phone: { const: "1" }
        }
      },
      then: {
        anyOf: [
          { required: ["phone_mobile_new"] },
          { required: ["phone_home_new"] },
        ],
      },
    },
    {
      if: {
        required: ["job"],
        properties: {
          job: { const: "その他" }
        }
      },
      then: {
        required: ["job_etc"]
      }
    },
    {
      if: {
        required: ["job"],
        properties: {
          job: { const: "個人事業主・自営業" }
        }
      },
      then: {
        required: ["industry"]
      }
    },
    {
      if: {
        required: ["industry"],
        properties: {
          industry: { const: "その他" }
        }
      },
      then: {
        required: ["industry_etc"]
      }
    },
  ]
};