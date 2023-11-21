import Great from "$icons/mood-smile-beam.tsx"
import Good from "$icons/mood-smile.tsx"
import Bad from "$icons/mood-sad.tsx"
import Terrible from "$icons/mood-wrrr.tsx"

import { Condition } from "../shared/types.ts"

export function ConditionIcon(
  props: { condition: Condition },
) {
  const { condition: {id, color} } = props;
  if (id===0) {
    return (<Great color={color} />)
  } else if (id===1) {
    return (<Good color={color} />)
  } else if (id===2) {
    return (<Bad color={color} />)
  } else {
    return (<Terrible color={color} />)
  }
}
