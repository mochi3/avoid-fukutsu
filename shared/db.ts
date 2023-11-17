const kv = await Deno.openKv();

export async function get<T>(key: (string | number)[]) {
  const res = await kv.get<T>(["categories", 1]);
  if (!res.value) throw new Error(`${key} がありません。`) 
  return res.value;
}

export function getAllList<T>(prefix: string) {
  return KvIterToArray(
    kv.list<T>({ prefix: [prefix] }),
  );
}

export async function getLast<T>(prefix: string) {
  const res = await KvIterToArray(
    kv.list<T>({ prefix: [prefix] }, { limit: 1, reverse: true }),
  )
  return res[0];
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

//2つ目が1対多
export async function createDataDouble<T>(
  value: T,
  keysPrimary: (string | number)[],
  keysSecondary: (string | number)[],
) {
  const res = await kv.atomic()
    .check({ key: keysPrimary, versionstamp: null })
    .set(keysPrimary, value)
    .set(keysSecondary, value)
    .commit();
  if (!res.ok) throw new Error("データを登録できませんでした。");
  return value;
}

export async function deleteData<T>(key: (string | number)[]) {
  const getRes = await kv.get(key);
  if (!getRes.value) return "該当データがありません";
  const res = await kv.atomic().check(getRes).delete(key).commit();
  if (!res) throw new Error("データの削除に失敗しました。");
  return "データを削除しました。";
}

export async function deleteDataDouble<T>(key1: (string | number)[], key2: (string | number)[]) {
  const getRes = await kv.get<T>(key1);
  if (!getRes.value) return "該当データがありません";
  const res = await kv.atomic()
    .check(getRes)
    .delete(key1)
    .delete(key2)
    .commit();
  if (!res) throw new Error("データの削除に失敗しました。");
  return "データを削除しました。";  
}
