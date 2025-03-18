import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@aws-amplify/ui-react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEntryDataContext } from "../context/EntryDataContext";

const client = generateClient<Schema>();

const Step4: React.FC = () => {
  const { entryData } = useEntryDataContext();
  const [entry, setEntry] = useState<Schema["entrydata"]["type"] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (entryData && entryData.tran_id) {
      const fetchEntry = async () => {
        const fetchedEntry = await client.models.entrydata.get({ tenant_id: entryData.tenant_id, tran_id: entryData.tran_id });
        setEntry(fetchedEntry.data);
      };
      fetchEntry();
    }
  }, [entryData]);

  const prevStep = () => {
    navigate("/");
  };

  return (
    <main>
      <h1>Step 4</h1>
      <Button onClick={prevStep}>Back</Button>
      {entry && (
        <ul>
          {Object.entries(entry).map(([key, value]) => (
            <li key={key}>
              <strong>{key.replace(/_/g, " ")}:</strong> {value ? value.toString() : "N/A"}<br />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Step4;