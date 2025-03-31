import React from "react";
import { Button, Label, Flex } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@amplifyDir/data/resource";
import { useEntryDataContext } from "../context/EntryDataContext";
import { tenantConfigs } from "@tenantConfigs/tenantConfigIndex";

const client = generateClient<Schema>();

// 本人確認案内画面
const SP20103_callback: React.FC = () => {

  const { entryData, setEntryData} = useEntryDataContext();
  const navigate = useNavigate();

  //パラメータ受け取り
  const params = new URLSearchParams(location.search);
  const tenant_id = params.get("tenant_id");
  const tran_id = params.get("tran_id");

  React.useEffect(() => {
    const fetchData = async () => {
      if (!tenant_id || !tran_id) {
        alert("tenant_id または tran_id が指定されていません");
        return;
      }
      const tenantConfig = tenantConfigs[tenant_id];
      if (!tenantConfig) {
        alert("tenant_id が存在しません");
        return;
      }
      // DBから取得
      const fetchedEntry = await client.models.Entrydata.get({ tenant_id: tenant_id!, tran_id: tran_id });
      if (
        !fetchedEntry.data || 
        fetchedEntry.errors || 
        !Array.isArray(fetchedEntry.data) || 
        fetchedEntry.data.length === 0 || 
        fetchedEntry.data[0].status !== "00"
      ) {
        alert("DBにデータがありません。");
        return;
      }
      // メモリへ展開
      const newEntryData = {
        tenant_id: tenant_id,
        tenant_name: tenantConfig.tenantName,
        tran_id: tran_id,
        kind: fetchedEntry.data[0].kind,
        name: fetchedEntry.data[0].name,
        birth: fetchedEntry.data[0].birth,
        address: fetchedEntry.data[0].address,
      };
      
      setEntryData(newEntryData);
    };

    fetchData();
  }, [tenant_id, tran_id, setEntryData]);


  // 次の画面へ
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if(entryData!.kind === "1"){
      navigate("/SP20201");
    }else if(entryData!.kind === "2"){
      navigate("/SP20301");
    }
  };

  return (
    <main>
      <h1>本人確認コールバック画面（実際は即リダイレクトする）</h1>
      <Label>
        <strong>tenant_id:</strong> {tenant_id}<br/>
        <strong>tenant_name:</strong> {entryData!.tenant_name}<br/>
        <strong>tran_id:</strong> {tran_id}<br/>
        <strong>kind:</strong> {entryData!.kind}<br/>
      </Label>
      <Flex as="form" onSubmit={handleSubmit} direction="column" gap="1rem" alignItems="flex-start">
      <Button type="submit">次の画面へ</Button>
    </Flex>
    </main>
  );
}

export default SP20103_callback;
