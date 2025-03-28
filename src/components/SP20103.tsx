import { Button, Label, Flex } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import { v4 as uuidv4 } from 'uuid'; // Add this import
import type { Schema } from "../../amplify/data/resource";
import { useEntryDataContext } from "../context/EntryDataContext";


const client = generateClient<Schema>();

// 本人確認案内画面
const SP20103: React.FC = () => {

  //前画面のデータを引継ぎ
  const { entryData ,setEntryData} = useEntryDataContext();
  const navigate = useNavigate();

  // マイナンバーカードで本人確認
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const tran_id = uuidv4();

    // DBへ登録
    const newEntry = await client.models.Entrydata.create({ 
      tenant_id: entryData?.tenant_id!,
      tran_id: tran_id,
      status: "00",
      kind: entryData?.kind,
    });
    if (newEntry.data) {
      setEntryData(newEntry.data);
      navigate("/SP20103_dummy?tenant_id=" + entryData?.tenant_id + "&tran_id=" + tran_id);
    }else{
      newEntry.errors?.forEach(error => {
        console.error(`Error: ${error.message}`);
        alert(`エラーが発生しました: ${error.message}`);
      });
    }
  };

  return (
    <main>
      <h1>本人確認案内画面</h1>
      <Label>
        <strong>tenant_id:</strong> {entryData?.tenant_id ?? ""}<br/>
        <strong>tenant_name:</strong> {entryData?.tenant_name ?? ""}<br/>
        <strong>tran_id:</strong> {entryData?.tran_id ?? ""}<br/>
        <strong>kind:</strong> {entryData?.kind ?? ""}<br/>
      </Label>
      <Flex as="form" onSubmit={handleSubmit} direction="column" gap="1rem" alignItems="flex-start">
      <Button type="submit">マイナンバーカードで本人確認</Button>
    </Flex>
    </main>
  );
}

export default SP20103;
