import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@aws-amplify/ui-react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEntryDataContext } from "../context/EntryDataContext";

const client = generateClient();
const Step1: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setEntryData } = useEntryDataContext();

  const nextStep = async () => {
    const params = new URLSearchParams(location.search);
    const tenantId = params.get("tenant_id") || "oki_tenant";

    try {
      const data = await client.models.entrydata.create({tenant_id: tenantId,tran_id:"hogeg"});
      if (data) {
        setEntryData(data);
        navigate("/step2");
      } else {
        console.error("Failed to create new entry");
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
    }
  };

  return (
    <main>
      <h1>Step 1</h1>
      <Button onClick={nextStep}>Next</Button>
    </main>
  );
};

export default Step1;