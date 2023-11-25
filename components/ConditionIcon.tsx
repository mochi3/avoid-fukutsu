import Great from "$icons/mood-smile-beam.tsx";
import Good from "$icons/mood-smile.tsx";
import Bad from "$icons/mood-sad.tsx";
import Terrible from "$icons/mood-wrrr.tsx";
import { createElement } from "preact";

import { Condition } from "../shared/types.ts";

export function ConditionIcon(
  props: { condition: Condition },
) {
  const { condition: { id, color, message } } = props;
  const componentList = [ Great, Good, Bad, Terrible ];
  const Component = componentList[id];
  return (
    <div class={`flex text-[${color}]`}>
      <Component color={color} />
      {message}
    </div>
  );
}
