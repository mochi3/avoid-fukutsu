import Great from "$icons/mood-smile-beam.tsx";
import Good from "$icons/mood-smile.tsx";
import Bad from "$icons/mood-sad.tsx";
import Terrible from "$icons/mood-wrrr.tsx";
import { createElement } from "preact";

import { Condition } from "../shared/types.ts";

export function ConditionIcon(
  props: { condition: Condition; style?: string },
) {
  const { condition: { id, color, message }, style } = props;
  const componentList = [Great, Good, Bad, Terrible];
  const Component = componentList[id];
  return (
    <div class={`flex space-x-1 items-center text-[${color}] ${style}`}>
      <Component color={color} />
      <span>{message}</span>
    </div>
  );
}
