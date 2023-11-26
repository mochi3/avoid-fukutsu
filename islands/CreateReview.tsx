import Carrot from "$icons/carrot.tsx";
import Down from "$icons/chevron-down.tsx";
import { useState } from "preact/hooks";
import { createPortal, TargetedEvent } from "preact/compat";

import {
  Condition,
  conditionList,
  Expired,
  expiredTypeList,
  Food,
  Review,
  Url,
} from "../shared/types.ts";
import { useFocus, useInput } from "../shared/custom.ts";
import { ConditionIcon } from "../components/ConditionIcon.tsx";

export default function CreateReview(props: { foods: Food[] }) {
  const { foods } = props;
  const [showModal, setShowModal] = useState(false);
  const { value: foodFocusValue, ...foodFocus } = useFocus();
  const { set: setFoodInput, ...foodInput } = useInput("");
  const [food, setFood] = useState({} as Food);
  const [expired, setExpired] = useState(
    { value: 0, type: expiredTypeList[0] } as Expired,
  );
  const [condition, setCondition] = useState(conditionList[0]);
  const [showConditionList, setShowConditionList] = useState(false);
  const { set, ...message } = useInput("");

  const clickModal = (e: Event) => {
    setShowConditionList(false);
    e.stopPropagation();
  };
  const selectFood = (food: Food) => {
    setFoodInput(food.name);
    setFood(food);
  };
  const clickCondition = (e: Event, condition: Condition) => {
    setCondition(condition);
    setShowConditionList(!showConditionList);
    e.stopPropagation();
  };
  const submit = async () => {
    const body: Review = {
      id: "",
      food,
      expired,
      condition,
      message: message.value,
    };
    console.log(JSON.stringify(body));
    const res = await fetch(Url.ApiReviews, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        class="text-white bg-grayellow-500 flex pl-10 pr-8 py-5 rounded-lg shadow-md space-x-2 focus:outline-none"
      >
        <p class="text-lg">Create review</p>
        <Carrot />
      </button>
      {showModal && createPortal(
        <>
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 ">
          </div>
          <div
            onClick={() => setShowModal(false)}
            class="fixed inset-0  w-screen flex justify-center items-center"
          >
            <div
              onClick={(e) => clickModal(e)}
              class="bg-white p-10 rounded-md w-[670px] h-[500px] space-y-10"
            >
              <form class="space-y-5">
                <div class="flex flex-col">
                  <label for="food">Food</label>
                  <input
                    {...foodInput}
                    {...foodFocus}
                    class="bg-grayellow-200 h-5 outline-none p-3"
                    id="food"
                    placeholder="りんご"
                  />
                  <div class="relative">
                    {foodFocusValue && (
                      <ul class="absolute bg-white top-0 right-0 w-full rounded-b-sm border">
                        {foods.filter((food) =>
                          foodInput.value !== "" &&
                          food.name.indexOf(foodInput.value) > -1
                        )
                          .map((food) => (
                            <li
                              class="cursor-pointer px-3 hover:bg-grayellow-100"
                              onMouseDown={() => selectFood(food)}
                            >
                              {food.name}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div class="flex flex-col">
                  <label>Expired</label>
                  <div class="flex">
                    <input
                      class="outline-none w-[100px] text-right"
                      type="number"
                      placeholder="20"
                      value={expired.value}
                      onChange={(e) =>
                        setExpired({
                          ...expired,
                          value: parseInt((e.target as HTMLInputElement).value),
                        })}
                    />
                    <select
                      class="outline-none"
                      name="expiredType"
                      onChange={(e) =>
                        setExpired({
                          ...expired,
                          type: expiredTypeList[
                            parseInt((e.target as HTMLSelectElement).value)
                          ],
                        })}
                    >
                      {expiredTypeList.map((expiredType) => (
                        <option value={expiredType.id}>
                          {expiredType.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div class="">
                  <label>Condition</label>
                  <div class="relative h-[37px]">
                    <div class="absolute top-0 bg-white border rounded-md">
                      {conditionList.map((list) => (
                        <div
                          class={`${
                            condition.id === list.id || showConditionList
                              ? "flex"
                              : "hidden"
                          } cursor-pointer items-center pl-2 h-[35px] w-[300px]`}
                          onClick={(e) => clickCondition(e, list)}
                        >
                          <ConditionIcon condition={list} />
                          {!showConditionList && (
                            <Down class="absolute right-0 text-grayellow-500 pr-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div class="flex flex-col">
                  <label for="message">Message</label>
                  <textarea
                    id="message"
                    class="bg-grayellow-200 outline-none px-3"
                    placeholder="お腹を壊しました。"
                    {...message}
                  />
                </div>
              </form>
              <div class="space-x-2 flex justify-end">
                <button
                  onClick={() => submit()}
                  class="bg-orange-400 text-white px-6 py-3 rounded-md focus:outline-none"
                >
                  Submit
                </button>
                <button
                  class=" px-6 py-3 rounded-md border-2 focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>,
        document.body,
      )}
    </>
  );
}
