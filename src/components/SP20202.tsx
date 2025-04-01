import { useNavigate } from "react-router-dom";
import { Button, Label } from "@aws-amplify/ui-react";
import type { Schema } from "@amplifyDir/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEntryDataContext } from "../context/EntryDataContext";

const client = generateClient<Schema>();


// 口座開設確認
const SP20202: React.FC = () => {
  const { entryData } = useEntryDataContext();
  const navigate = useNavigate();

  const updateEntry = async () => {
    if (entryData) {
      const updatedData = {
        id:                 entryData.id,
        tenant_id:          entryData.tenant_id,
        kind:               entryData.kind,
        status:             "02",
        name:               entryData.name,
        name_kana:          entryData.name_kana,
        birth:              entryData.birth,
        gender:             { "男性": "1", "女性": "2", "未回答": "3" }[ entryData.gender as string ],
        zipcode:            entryData.zipcode,
        address:            entryData.address,
        phone_mobile:       entryData.phone_mobile,
        phone_home:         entryData.phone_home,
        email:              entryData.email,
        nationality:        entryData.nationality === "日本以外" ? entryData.nationality_etc : entryData.nationality,
        residential_status: entryData.residential_status === "その他" ? entryData.residential_status_etc : entryData.residential_status,
        expiration_date:    entryData.expiration_date,
        purpose:            entryData.purpose === "その他" ? entryData.purpose_etc : entryData.purpose,
        shop_kind:          { "ネット":"1","実店舗":"1" }[entryData.shop_kind as string],
        shop_name:          entryData.shop_name,
        my_number:          entryData.my_number,
        card_pin:           entryData.card_pin,
        passbook:           entryData.passbook,
        job:                entryData.job === "その他" ? entryData.job_etc : entryData.job,
        industry:           entryData.industry === "その他" ? entryData.industry_etc : entryData.industry,
        office_name:        entryData.office_name,
        office_kana:        entryData.office_kana,
        office_phone:       entryData.office_phone,

        business_details:    entryData.business_details,
        foreign_trade:      entryData.foreign_trade === "あり" ? entryData.foreign_trade_cname : entryData.foreign_trade,
        foreign_assets:     entryData.foreign_assets === "あり" ? entryData.foreign_assets_cname : entryData.foreign_assets,
        foreign_details:    entryData.foreign_details,
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
      <h1>口座開設確認</h1>
      <div >
        <Label>
          <strong>tenant_id:</strong> {entryData!.tenant_id}<br/>
          <strong>tenant_name:</strong> {entryData!.tenant_name}<br/>
          <strong>id:</strong> {entryData!.id}<br/>
          <strong>kind:</strong> {entryData!.kind}<br/>
        </Label>

        {entryData && (
          <>
            {Object.entries(entryData).map(([key, value]) => (
              <div key={key}>
                <strong>{key.replace(/_/g, " ")}:</strong> {value ?? ""}<br />
              </div>
            ))}
            <Button onClick={() => navigate("/SP20201")}>戻る</Button>
            <Button onClick={updateEntry}>登録</Button>
          </>
        )}
      </div>
    </main>
  );
};

export default SP20202;