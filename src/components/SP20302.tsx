import { useNavigate } from "react-router-dom";
import { Button } from "@aws-amplify/ui-react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEntryDataContext } from "../context/EntryDataContext";

const client = generateClient<Schema>();


// 内容変更確認
const SP20302: React.FC = () => {
  const { entryData } = useEntryDataContext();
  const navigate = useNavigate();

  const updateEntry = async () => {
    if (entryData) {
      const updatedData = {
        tran_id:            entryData.tran_id,
        tenant_id:          entryData.tenant_id,
        kind:               entryData.kind,
        status:             "02",
        name:               entryData.name,
        name_kana:          entryData.name_kana,
        birth:              entryData.birth,
        gender:             { "男性": "1", "女性": "2", "未回答": "3" }[ entryData.gender as string ],
        shop_code:          entryData.shop_code,
        account_kind:       entryData.account_kind,
        account_number:     entryData.account_number,
        zipcode:            entryData.zipcode,
        address:            entryData.address,
        address_kana:       entryData.address_kana,
        phone_mobile_new:   entryData.phone_mobile_new,
        phone_home_new:     entryData.phone_home_new,
        job:                entryData.job === "その他" ? entryData.job_etc : entryData.job,
        industry:           entryData.industry === "その他" ? entryData.industry_etc : entryData.industry,
        office_name:        entryData.office_name,
        office_kana:        entryData.office_kana,
        office_phone:       entryData.office_phone,
      }
      console.dir(updatedData);
      try {
        const updatedEntry = await client.models.Entrydata.update(updatedData);
        if (updatedEntry.data) {
          //setEntryData(updatedEntry.data);
          navigate("/SP20401");
        } else {
          updatedEntry.errors?.forEach(error => {
            console.error(`Error: ${error.message}`);
            alert(`エラーが発生しましたyo: ${error.message}`);
          });
        }
      } catch (error) {
        console.error(`Error: ${error}`);
        alert(`エラーが発生しました: ${error}`);
      }
    }
  };

  return (
    <main>
      <h1>内容変更確認</h1>
      <div >
        {entryData && (
          <>
            {Object.entries(entryData).map(([key, value]) => (
              <div key={key}>
                <strong>{key.replace(/_/g, " ")}:</strong> {value ?? ""}<br />
              </div>
            ))}
            <Button onClick={() => navigate("/SP20301")}>戻る</Button>
            <Button onClick={updateEntry}>登録</Button>
          </>
        )}
      </div>
    </main>
  );
};

export default SP20302;