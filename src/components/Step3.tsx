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
    if (entryData && entryData.tran_id) {
      const updatedEntry = await client.models.entrydata.update({ ...entryData, tenant_id: entryData.tenant_id, tran_id: entryData.tran_id });
      if (updatedEntry.data) {
        setEntryData(updatedEntry.data);
      }
      navigate("/step4");
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