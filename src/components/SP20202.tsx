import { useNavigate } from "react-router-dom";
import { Button, Label } from "@aws-amplify/ui-react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEntryDataContext } from "../context/EntryDataContext";

const client = generateClient<Schema>();

// 口座開設確認
const SP20202: React.FC = () => {
  const { entryData, setEntryData } = useEntryDataContext();
  const navigate = useNavigate();

  const updateEntry = async () => {
    console.log("entryData", entryData);
    if (entryData && entryData.tran_id) {
      // entryDataのコピーを作成し、createdAtとupdatedAtを削除
      const { createdAt, updatedAt, ...dataToUpdate } = entryData;
      const updatedEntry = await client.models.Entrydata.update(dataToUpdate);
      if (updatedEntry.data) {
        setEntryData(updatedEntry.data);
        navigate("/SP20401");
      } else {
        updatedEntry.errors?.forEach(error => {
          console.error(`Error: ${error.message}`);
          alert(`エラーが発生しました: ${error.message}`);
        });
      }
    }
  };

  return (
    <main>
      <h1>口座開設確認</h1>
      {entryData && (
        <>
          {Object.entries(entryData).map(([key, value]) => (
            <Label key={key}>
              <>
                <strong>{key.replace(/_/g, " ")}:</strong> {value ?? ""}
              </>
            </Label>
          ))}
          <Button onClick={updateEntry}>登録</Button>
        </>
      )}
    </main>
  );
};

export default SP20202;