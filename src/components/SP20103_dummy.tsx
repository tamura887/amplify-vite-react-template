import { Button, Label, Flex } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@amplifyDir/data/resource";


const client = generateClient<Schema>();

// 本人確認案内画面
const SP20103_dummy: React.FC = () => {

  //パラメータ受け取り
  const params = new URLSearchParams(location.search);
  const tenant_id = params.get("tenant_id");
  const id = params.get("id");

  const navigate = useNavigate();

  // 認証OK
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 本人認証済みとして基本４情報の疑似データ入れる
    if (!tenant_id || !id) {
      alert("tenant_id または id が無効です。");
      return;
    }

    const updateData =  {
      tenant_id: tenant_id,
      id: id,
      name : "沖　太郎",
      birth : "19961231",
      address : "東京都千代田区1-1-1　○○ビル",
    }
    // DBへ登録
    try{
      await client.models.Entrydata.update(updateData);
    } catch (error) {
      console.error(`Error: ${error}`);
      alert(`エラーが発生しました: ${error}`);
      return;
    }
    navigate("/SP20103_callback?tenant_id=" + tenant_id + "&id=" + id);
  };

  return (
    <main>
      <h1>テスト用本人確認（疑似画面）</h1>
      <Label>
        <strong>tenant_id:</strong> {tenant_id}<br/>
        <strong>id:</strong> {id}<br/>
      </Label>
      <Flex as="form" onSubmit={handleSubmit} direction="column" gap="1rem" alignItems="flex-start">
      <Button type="submit">認証OK</Button>
    </Flex>
    </main>
  );
}

export default SP20103_dummy;
