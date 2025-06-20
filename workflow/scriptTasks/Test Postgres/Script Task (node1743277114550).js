const model = (await admin.database().ref(`dashboards/${callDash}/models/orders`).once('value')).val()

// PostgreSQL connection config
const pool = new pg.Pool({
  user: "stagetest",
  password: 's"^O67ov/TNd)~<?',
  database: "postgres",
  host: "/cloudsql/tangledev00:us-east1:newmysql", // Cloud SQL Unix socket
});
const client = await pool.connect();

const orders = Object.entries(model).map(([rowKey, values]) => ({
    key: rowKey, // ✅ Use `key`
    data: JSON.stringify(values)
}));

const values = orders.map((o, i) => `($${i * 2 + 1}, $${i * 2 + 2}::jsonb)`).join(",");
const sql = `
    INSERT INTO test_orders (key, data)
    VALUES ${values}
    ON CONFLICT (key) DO UPDATE 
    SET data = EXCLUDED.data;
`;

const queryParams = orders.flatMap(o => [o.key, o.data]); // ✅ Corrected `o.key`

await client.query(sql, queryParams);
client.release();

context.data = { message: `Postgres table "test_orders" updated.` };
