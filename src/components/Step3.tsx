import { useNavigate } from "react-router-dom";
import { Button, Label } from "@aws-amplify/ui-react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEntryDataContext } from "../context/EntryDataContext";

const client = generateClient<Schema>();


const Step3: React.FC = () => {
  const { entryData, setEntryData } = useEntryDataContext();
  const navigate = useNavigate();

  const updateEntry = async () => {
    console.log("entryData", entryData);
    if (entryData && entryData.tran_id) {
      // entryDataのコピーを作成し、createdAtとupdatedAtを削除
      const { createdAt, updatedAt, ...dataToUpdate } = entryData;
      const updatedEntry = await client.models.entrydata.update(dataToUpdate);
      if (updatedEntry.data) {
        setEntryData(updatedEntry.data);
        navigate("/step4");
      } else {
        updatedEntry.errors?.forEach(error => {
          console.error(`Error: ${error.message}`);
          alert(`エラーが発生しました: ${updatedEntry.errors}`);
        });
      }
    }
  };

  return (
    <main>
      <h1>Step 3</h1>
      {entryData && (
        <>
          {Object.entries(entryData).map(([key, value]) => (
            <Label key={key}>
              <>
                <strong>{key.replace(/_/g, " ")}:</strong> {value ?? ""}
              </>
            </Label>
          ))}
          <Button onClick={updateEntry}>Update Entry</Button>
        </>
      )}
    </main>
  );
};

export default Step3;