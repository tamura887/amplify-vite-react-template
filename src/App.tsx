import { useEffect, useState } from "react";
import { TextField, Button } from "@aws-amplify/ui-react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [entries, setEntries] = useState<Array<Schema["entrydata"]["type"]>>([]);
  const [tenantId, setTenantId] = useState("");
  const [kind, setKind] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");

  useEffect(() => {
    client.models.entrydata.observeQuery().subscribe({
      next: (data) => setEntries([...data.items]),
    });
  }, []);

  function createEntry() {
    if (tenantId.trim() === "" || kind.trim() === "" || status.trim() === "" || name.trim() === "" || birth.trim() === "") return;
    client.models.entrydata.create({ tenant_id: tenantId, kind, status, name, birth }).then(() => {
      setTenantId("");
      setKind("");
      setStatus("");
      setName("");
      setBirth("");
    });
  }

  return (
    <main>
      <h1>Entry Data</h1>
      <TextField
        label="Tenant ID"
        value={tenantId}
        onChange={(e) => setTenantId(e.target.value)}
      />
      <TextField
        label="Kind"
        value={kind}
        onChange={(e) => setKind(e.target.value)}
      />
      <TextField
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Birth"
        value={birth}
        onChange={(e) => setBirth(e.target.value)}
      />
      <Button onClick={createEntry}>+ Add Entry</Button>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <strong>ID:</strong> {entry.id}<br />
            <strong>Tenant ID:</strong> {entry.tenant_id}<br />
            <strong>Kind:</strong> {entry.kind}<br />
            <strong>Status:</strong> {entry.status}<br />
            <strong>Name:</strong> {entry.name}<br />
            <strong>Birth:</strong> {entry.birth}<br />
            <strong>Created At:</strong> {new Date(entry.createdAt).toLocaleString()}<br />
            <strong>Updated At:</strong> {new Date(entry.updatedAt).toLocaleString()}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new entry.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;