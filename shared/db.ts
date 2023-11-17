const kv = await Deno.openKv();

export function getAllList<T>(key: string) {
  return KvIterToArray(
    kv.list<T>({ prefix: [key] }),
  );
}

export async function getLast<T>(key: string) {
  return (await KvIterToArray(
    kv.list<T>({ prefix: [key] }, { limit: 1, reverse: true }),
  ))[0];
}

async function KvIterToArray<T>(iter: Deno.KvListIterator<T>) {
  const list: T[] = [];
  for await (const it of iter) list.push(it.value);
  return list;
}

export async function createData<T>(value: T, key: (string | number)[]) {
  const res = await kv.atomic()
    .check({ key, versionstamp: null })
    .set(key, value)
    .commit();
  if (!res.ok) throw new Error("データを登録できませんでした。");
  return value;
}

export async function deleteData<T>(key: (string | number)[]) {
  console.log(key);
  const res = await kv.get(key);
  if (!res.value) return "該当データがありません";
  const ok = await kv.atomic().check(res).delete(key).commit();
  if (!ok) throw new Error("データの削除に失敗しました。");
  return "データを削除しました。";
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
