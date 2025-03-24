import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import { v4 as uuidv4 } from 'uuid'; // Add this import
import type { Schema } from "../../amplify/data/resource";
import { useEntryDataContext } from "../context/EntryDataContext";


const client = generateClient<Schema>();

// 業務選択画面
const SP20101: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setEntryData } = useEntryDataContext();

  const nextStep = async () => {
    const params = new URLSearchParams(location.search);
    const tenantId = params.get("tenant_id") || "oki_tenant";

    const newEntry = await client.models.entrydata.create({ tenant_id: tenantId, tran_id: uuidv4() });
    if (newEntry.data?.tran_id) {
      setEntryData(newEntry.data);
      navigate("/SP20102");
    } else {
      newEntry.errors?.forEach(error => {
        console.error(`Error: ${error.message}`);
        alert(`エラーが発生しました: ${error.message}`);
      });      
    }
  };

  return (
    <main>
      <h1>業務選択画面</h1>
      <Button onClick={nextStep}>Next</Button>
    </main>
  );
};

export default SP20101;