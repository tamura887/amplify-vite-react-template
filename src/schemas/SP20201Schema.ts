
import { validatePatterns, ValidationSchema } from "../schemas/validationSchema";
export const SP20201Schema: ValidationSchema = {
  type: "object",
  properties: {
    name: {
      title: "名前",
      type: "string",
      maxLength: 40,
      uiType: "text",
      disible: true,
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
      disible: true,
    },
    gender: {
      title: "性別",
      type: "string",
      uiType: "radio",
      enum: ["男性", "女性", "回答しない"],
    },
    zipcode: {
      title: "郵便番号",
      type: "string",
      maxLength: 7,
      minLength: 7,
      pattern: validatePatterns.halfWidthNumbers,
      uiType: "text",
    },
    address: {
      title: "住所",
      type: "string",
      maxLength: 50,
      uiType: "textarea",
      disible: true,
    },
    phone_mobile: {
      title: "携帯電話番号",
      type: "string",
      maxLength: 11,
      minLength: 11,
      pattern: validatePatterns.halfWidthNumbers,
      uiType: "text",
    },
    phone_home: {
      title: "自宅電話番号",
      type: "string",
      maxLength: 11,
      minLength: 10,
      pattern: validatePatterns.halfWidthNumbers,
      uiType: "text",
    },
    email: {
      title: "メールアドレス",
      type: "string",
      maxLength: 40,
      pattern: validatePatterns.email,
      uiType: "text",
    },
    email_comfirm: {
      title: "メールアドレス（再入力）",
      type: "string",
      maxLength: 40,
      pattern: validatePatterns.email,
      uiType: "text",
    },
    nationality: {
      title: "国籍",
      type: "string",
      uiType: "radio",
      enum: ["日本", "日本以外"],
      group:"nationality",
    },
    nationality_etc: {
      title: "国籍その他",
      type: "string",
      maxLength: 30,
      uiType: "text",
      dependency: { field: "nationality", value: "日本以外" },
      group:"nationality",
    },
    residential_status: {
      title: "在留資格",
      type: "string",
      uiType: "select",
      options: [
        "特別永住者",
        "永住者",
        "定住者",
        "技能実習",
        "留学",
        "日本人の配偶者等",
        "永住者の配偶者等",
        "技術・人文知識・国際業務",
        "その他"
      ],
      group:"nationality",
    },
    residential_status_etc: {
      title: "在留資格その他",
      type: "string",
      maxLength: 30,
      uiType: "text",
      dependency: { field: "residential_status", value: "その他" },
      group:"nationality",
    },
    expiration_date: {
      title: "在留資格満了日",
      type: "string",
      pattern: validatePatterns.yyyymmdd,
      uiType: "text",
      group:"nationality",
    },
    purpose: {
      title: "お取引目的",
      type: "string",
      uiType: "select",
      options: [
        "生計費決済",
        "事業費決済",
        "給与・年金受取",
        "貯蓄・資産運用",
        "融資",
        "外国為替取引",
        "貸金庫利用",
        "その他"
      ],
      group:"purpose",
    },
    purpose_etc: {
      title: "お取引目的その他",
      type: "string",
      maxLength: 30,
      uiType: "text",
      dependency: { field: "purpose", value: "その他" },
      group:"purpose",
    },
    shop_kind: {
      title: "取り扱い店舗",
      type: "string",
      uiType: "radio",
      enum: ["ネット", "実店舗"],
      group:"shop_kind",
    },
    shop_name: {
      title: "取り扱い店舗名",
      type: "string",
      maxLength: 15,
      uiType: "text",
      dependency: { field: "shop_kind", value: "実店舗" },
      group:"shop_kind",
    },
    my_number: {
      title: "マイナンバー確認",
      type: "string",
      uiType: "radio",
      enum: ["はい", "いいえ"],
      group:"my_number",
    },
    card_pin: {
      title: "カードパスワード",
      type: "string",
      maxLength: 4,
      pattern: validatePatterns.halfWidthNumbers,
      uiType: "password",
      group:"card_pin",
    },
    card_pin_confirm: {
      title: "カードパスワード(再入力)",
      type: "string",
      maxLength: 4,
      pattern: validatePatterns.halfWidthNumbers,
      uiType: "password",
      group:"card_pin",
    },
    passbook: {
      title: "通帳発行",
      type: "string",
      uiType: "radio",
      enum: ["はい", "いいえ"],
      group:"passbook",
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
        "その他"
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
      dependency: { field: "job", value: "その他" },
      group:"job",
    },
    industry: {
      title: "業種",
      type: "string",
      uiType: "select",
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
        "その他"
      ],
      group:"job",
    },
    industry_etc: {
      title: "業種その他",
      type: "string",
      maxLength: 30,
      uiType: "text",
      dependency: { field: "industry", value: "その他" },
      group:"job",
    },
    office_name: {
      title: "勤務先・学校名称",
      type: "string",
      maxLength: 40,
      uiType: "text",
      group:"job",
    },
    office_kana: {
      title: "勤務先・学校名称（カナ）",
      type: "string",
      maxLength: 50,
      uiType: "text",
      group:"job",
    },
    office_phone: {
      title: "勤務先・学校電話番号",
      type: "string",
      minLength: 10,
      maxLength: 11,
      pattern: validatePatterns.halfWidthNumbers,
      uiType: "text",
      group:"job",
    },
    business_details: {
      title: "事業内容",
      type: "string",
      maxLength: 30,
      uiType: "text",
      guidance:[
        {
          title:"補足説明",
          contents:"具体的な事業内容\n\n【具体的な事業内容】には、大工工事業・左官工事業・電気工事業・レストラン・喫茶店・不動産賃貸業・駐車場業等の具体的な内容をご入力ください。"
        }
      ],
      group:"business_details",
    },
    foreign_trade: {
      title: "外国との取引",
      type: "string",
      uiType: "radio",
      enum: ["なし", "あり"],
      group:"business_details",
    },
    foreign_trade_cname: {
      title: "外国との取引国名",
      type: "string",
      maxLength: 30,
      uiType: "text",
      dependency: { field: "foreign_trade", value: "あり" },
      group:"business_details",
    },
    foreign_assets: {
      title: "外国資産",
      type: "string",
      uiType: "radio",
      enum: ["なし", "あり"],
      group:"business_details",
    },
    foreign_assets_cname: {
      title: "外国資産国名",
      type: "string",
      maxLength: 30,
      uiType: "text",
      dependency: { field: "foreign_assets", value: "あり" },
      group:"business_details",
    },
    foreign_details: {
      title: "外国資産具体的内容",
      type: "string",
      maxLength: 60,
      uiType: "text",
      group:"business_details",
    },
  },
  required: ["name","name_kana", "birth", "gender","zipcode","address", "phone_mobile","email","email_comfirm","nationality","purpose","shop_kind","my_number","card_pin","card_pin_confirm","passbook","job","foreign_assets"],

  allOf: [
    {
      properties: {
        email: {
          type: "string",
        },
        email_comfirm: {
          type: "string",
          const: { $data: "1/email" }
        }
      },
      required: ["email","email_comfirm"]      
    },
    {
      if: {
        required: ["nationality"],
        properties: {
          nationality: { const: "日本以外" }
        }
      },
      then: {
        required: ["nationality_etc"]
      }
    },
    {
      if: {
        required: ["purpose"],
        properties: {
          purpose: { const: "その他" }
        }
      },
      then: {
        required: ["purpose_etc"]
      }
    },
    {
      if: {
        required: ["shop_kind"],
        properties: {
          shop_kind: { const: "実店舗" }
        }
      },
      then: {
        required: ["shop_name"]
      }
    },
    {
      properties: {
        card_pin: {
          type: "string",
        },
        card_pin_confirm: {
          type: "string",
          const: { $data: "1/card_pin" }
        }
      },
      required: ["card_pin","card_pin_confirm"]      
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
    {
      if: {
        required: ["foreign_trade"],
        properties: {
          foreign_trade: { const: "あり" }
        }
      },
      then: {
        required: ["foreign_trade_cname"]
      },
    },
    {
      if: {
        required: ["foreign_assets"],
        properties: {
          foreign_assets: { const: "あり" }
        }
      },
      then: {
        required: ["foreign_assets_cname"]
      }
    },
  ]
};