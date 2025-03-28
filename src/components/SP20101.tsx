import { useNavigate, useLocation } from "react-router-dom";
import { Button ,Label} from "@aws-amplify/ui-react";
import { useEntryDataContext } from "../context/EntryDataContext";
import { tenantConfigs } from "../tenantConfigs/tenantConfigIndex";

// 業務選択画面
const SP20101: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { entryData,setEntryData } = useEntryDataContext();
  const params = new URLSearchParams(location.search);
  const tenant_id = params.get("tenant_id") || "9999";
  const tenant_name = tenantConfigs[tenant_id].tenantName;

  const nextStep = (kind: string) => {

    // DBには保存せず、entryDataに値を設定
    const newEntryData = {
      tenant_id: tenant_id,
      tenant_name:tenant_name,
      kind: kind
    };
    setEntryData(newEntryData);
    navigate("/SP20102");
  };

  return (
    <main>
      <h1>業務選択画面</h1>
      <Label>
        <strong>tenant_id:</strong> {tenant_id}<br/>
        <strong>tenant_name:</strong> {tenant_name}<br/>
      </Label>
      <Button onClick={() =>nextStep("1")}>新規口座開設</Button>
      <Button onClick={() =>nextStep("2")}>住所／電話番号変更</Button>
    </main>
  );
};

export default SP20101;