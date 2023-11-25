import { Review, conditionList, expiredTypeList } from "../shared/types.ts";
import { ConditionIcon } from "./ConditionIcon.tsx";

export function ReviewCard(
  props: { review: Review },
) {
  const { review: {expired, food, conditionId, message} } = props;
  return (
    <div class="border-2">
      <div>{expired.value}{expiredTypeList[expired.type].name}</div>
      <div class="flex">
        {/* <h3 class=""><ConditionIcon condition={condition} /></h3> */}
      </div>
      <p>{message}</p>
    </div>
  );
}
