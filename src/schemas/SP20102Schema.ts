
import { ValidationSchema } from "./validationSchema";
export const SP20102Schema: ValidationSchema = {
  type: "object",
  properties: {
    tokutei: {
      title: "特定取引を行う者の届出",
      type: "string",
      uiType: "radio",
      enum: ["はい", "いいえ"],
      guidance:[
        {
          title:"特定取引とは？",
          contents:"特定取引\n\n租税条約等の実施に伴う所得税法、法人税法及び地方税法の特例等に関する法律等の規定により、金融機関において所定のお取引を行う場合には、お客さまによる届出書のご提出と金融機関による届出書記載内容の確認、記録の作成・保存が義務付けられています。届出書をご提出いただけない場合、または届出書の内容をご提出書ご記載された内容と相違がある場合には、お取引をお断りすることがある他、お客さまへ課税が科される可能性もございますので、ご理解・ご協力のほど宜しくお願い申し上げます。\n\n居住地国についての質問にお答えください。"
        }
      ]
    },
    konpura: {
      title: "米国市民（米国籍保有者）もしくは米国居住者に該当しませんか？",
      type: "string",
      uiType: "radio",
      enum: ["はい", "いいえ"],
      guidance:[
        {
        title:"米国の外国口座税務コンプライアンスとは？",
        contents:"外国口座税務コンプライアンス法\n\n米国の外国口座税務コンプライアンス法（FATCA）及び関連する日米当局間声明により、お客さまが税務上の米国人（米国市民（米国籍保有者）または米国居住者）に該当するか否かを確認し、該当する場合にはお客さまの情報を米国内国歳入庁へ報告することが金融庁及び国税庁より要請されております。\n\n税務上の米国人に該当するか否かをお答え下さい。"
        }
      ]
    },
    zeisyuhou: {
      title: "以下の職にある者並びにあった者に該当しませんか？",
      type: "string",
      uiType: "radio",
      enum: ["はい", "いいえ"],
      guidance:[
        {
          title:"犯罪収益移転防止法とは？",
          contents:"犯罪収益移転防止法\n\n犯罪収益移転防止法により、金融機関等は、お客さまと一定の取引を行う際に、 お客さまが外国の元首又は外国政府において重要な公的地位を有する者等に該当する者であるかを確認する必要がございます。\n\n外国において重要な公的地位を有するか否かをお答え下さい。"
        },
        {
          title:"職務一覧",
          contents:"職務一覧\n\nわが国における内閣総理大臣その他の国務大臣および副大臣に相当する職、衆議院議長、衆議院副議長、参議院議長または参議院副議長に相当する職、最高裁判所の裁判官に相当する職、特命全権大使、特命全権公使、特派大使、政府代表または全権委員に相当する職、各省庁長官、省庁次官に相当する職、陸上幕僚長、海上幕僚長、航空幕僚長または自衛艦隊司令長官に相当する職、中央銀行の役員"
        }
      ]
    },
    zeisyuhoufm: {
      title: "全問の職にある者並びにあった者の家族に該当しませんか？",
      type: "string",
      uiType: "radio",
      enum: ["はい", "いいえ"],
      guidance:[
        {
          title:"家族の範囲",
          contents:"家族の範囲\n\n配偶者（婚姻の届出をしていないが、事実上婚姻関係に相当する事情にある者を含む）、父母、子および兄弟姉妹ならびにこれらの者以外の配偶者（司命）の父母および子をいう。"
        }
      ]
    },
    hansya: {
      title: "反社会的勢力ではないことの表明・確約に関する同意",
      type: "string",
      uiType: "radio",
      enum: ["同意", "不同意"],
    },
  
  },
  required: [],
};