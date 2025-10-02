export const omitUndefinedNullDeep = (obj: any): any => {
  if (Array.isArray(obj)) return obj.map(omitUndefinedNullDeep);
  if (obj && typeof obj === "object") {
    const out: any = {};
    for (const [k, v] of Object.entries(obj)) {
      if (v === undefined || v === null) continue;
      out[k] = omitUndefinedNullDeep(v);
    }
    return out;
  }
  return obj;
};
