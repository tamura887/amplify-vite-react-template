import { Button, Label, Flex } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { useEntryDataContext } from "../context/EntryDataContext";

// SMS送信完了
const SP20401: React.FC = () => {
  //前画面のデータを引継ぎ
  const { entryData } = useEntryDataContext();
  const navigate = useNavigate();

  // 全体チェック
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/SP20402");
  };

  return (
    <main>
      <h1>SMS送信完了</h1>
      <Label>
        <strong>tenant_id:</strong> {entryData!.tenant_id}<br/>
        <strong>tenant_name:</strong> {entryData!.tenant_name}<br/>
        <strong>id:</strong> {entryData!.id}<br/>
        <strong>kind:</strong> {entryData!.kind}<br/>
      </Label>
      <Flex as="form" onSubmit={handleSubmit} direction="column" gap="1rem" alignItems="flex-start">
      <Button type="submit">閉じる</Button>
    </Flex>
    </main>
  );
}

export default SP20401;
