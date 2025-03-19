import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@aws-amplify/ui-react";
import { generateClient, GraphQLResult } from "aws-amplify/api";
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
      const newEntry = await client.graphql({
        query: `mutation CreateEntryData($tenant_id: String!) {
          createEntryData(tenant_id: $tenant_id) {
            tenant_id
            tran_id
            kind
            status
            name
            birth
            createdAt
            updatedAt
          }
        }`,
        variables: { tenant_id: tenantId },
      });

      if ((newEntry as GraphQLResult<any>).data?.createEntryData?.tran_id) {
        setEntryData((newEntry as GraphQLResult<any>).data.createEntryData);
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