import { conditionList, expiredTypeList, Review } from "../shared/types.ts";
import { ConditionIcon } from "./ConditionIcon.tsx";

export function ReviewCard(
  props: { review: Review },
) {
  const { review: { expired, food, condition, message } } = props;
  return (
    <div
      class={`border-2 rounded-md px-4 pt-2 pb-4 shadow-md border-[${condition.color}] space-y-2`}
    >
      <div class="flex">
        <ConditionIcon condition={condition} style="font-bold text-lg" />
      </div>
      <div
        class={`flex items-end space-x-0.5 pl-1 border-b-4 border-[${condition.color}]`}
      >
        <p class="font-bold text-2xl">
          {expired.value}
          <span class="text-lg">{expired.type.name}</span>
        </p>
        <p class="text-sm pb-0.5 font-bold">切れ</p>
      </div>
      <p class="pt-1">{message}</p>
    </div>
  );
}
