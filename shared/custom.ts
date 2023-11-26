import { TargetedEvent } from "preact/compat";
import { useState } from "preact/hooks";

export function useInput<T>(initialValue: T) {
  const [value, setValue] = useState(initialValue);

  return {
    set: (value: T) => setValue(value),
    value,
    onChange: (e: TargetedEvent) => {
      if (!e.target || !("value" in e.target)) return;
      setValue(e.target?.value as T);
    },
  };
}

export function useFocus() {
  const [value, setValue] = useState(false);
  return {
    value,
    onFocus: () => setValue(true),
    onblur: () => setValue(false),
  };
}
