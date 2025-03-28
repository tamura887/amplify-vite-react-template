import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@aws-amplify/ui-react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEntryDataContext } from "../context/EntryDataContext";

const client = generateClient<Schema>();

// 受付完了
const SP20402: React.FC = () => {
  const { entryData } = useEntryDataContext();
  const [entry, setEntry] = useState<Schema["Entrydata"]["type"] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (entryData && entryData.tran_id) {
      const fetchEntry = async () => {
        const fetchedEntry = await client.models.Entrydata.get({ tenant_id: entryData.tenant_id!, tran_id: entryData.tran_id! });
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
      <h1>受付完了</h1>
      {entry && (
        <div>
          <ul>
            {Object.entries(entry).map(([key, value]) => (
              <li key={key}>
                <strong>{key.replace(/_/g, " ")}:</strong> {value ? value.toString() : "N/A"}<br />
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button onClick={prevStep}>最初から</Button>
    </main>
  );
};

export default SP20402;