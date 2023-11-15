const kv = await Deno.openKv();

export async function getList<T>(key: string) {
  const iter = kv.list<string>({ prefix: [key] });
  const list = [];
  for await (const it of iter) list.push(it.value);
  return list;
}

export async function updateDb<T>(value: T, keysPrimary: (string | number)[]) {
  const res = await kv.atomic()
    .check({ key: keysPrimary, versionstamp: null })
    .set(keysPrimary, value)
    .commit();
  if (!res.ok) throw new Error("データを登録できませんでした。");
  return value;
}

export async function updateDbWithSecondary<T>(
  value: T,
  keysPrimary: (string | number)[],
  keysSecondary: (string | number)[],
) {
  const res = await kv.atomic()
    .check({ key: keysPrimary, versionstamp: null })
    .check({ key: keysSecondary, versionstamp: null })
    .set(keysPrimary, value)
    .set(keysSecondary, value)
    .commit();
  if (!res.ok) throw new Error("データを登録できませんでした。");
  return value;
}
