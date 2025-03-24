import { Button, Label, Flex } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { useEntryDataContext } from "../context/EntryDataContext";

// 重要事項確認画面
const SP20102: React.FC = () => {
  //前画面のデータを引継ぎ
  const { entryData } = useEntryDataContext();
  const navigate = useNavigate();

  // 全体チェック
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/SP20103");
  };

  return (
    <main>
      <h1>重要事項確認画面</h1>
      <Label>
        <strong>tenant_id:</strong> {entryData?.tenant_id ?? ""}
      </Label>
      <Label>
        <strong>tran_id:</strong> {entryData?.tran_id ?? ""}
      </Label>
      <Flex as="form" onSubmit={handleSubmit} direction="column" gap="1rem" alignItems="flex-start">
      <Button type="submit">同意</Button>
    </Flex>
    </main>
  );
}

export default SP20102;
