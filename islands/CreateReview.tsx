import Carrot from "$icons/carrot.tsx";
import Down from "$icons/chevron-down.tsx";
import { useState } from "preact/hooks";
import { createPortal } from "preact/compat";

import { conditionList, expiredTypeList, Food } from "../shared/types.ts";
import FoodInput from "./FoodInput.tsx";
import { ConditionIcon } from "../components/ConditionIcon.tsx";

export default function CreateReview(props: { foods: Food[] }) {
  const { foods } = props;
  const [showModal, setShowModal] = useState(false);
  const [foodFocus, setFoodFocus] = useState(false);
  const [foodInput, setFoodInput] = useState("");
  const [foodSelect, setFoodSelect] = useState("");
  const [conditionSelect, setConditionSelect] = useState("");
  const [selectCondition, setSelectCondition] = useState(3);
  const [showConditions, setShowConditions] = useState(false);
  const sendDelete = async () => {
    await fetch("", {
      method: "DELETE",
    });
  };
  const clickModal = (e: Event) => {
    setShowConditions(false);
    e.stopPropagation();
  };
  const selectFood = (food: Food) => {
    setFoodInput(food.name);
    setFoodSelect(food.id);
  };
  const clickCondition = (e: Event, id: number) => {
    setSelectCondition(id);
    setShowConditions(!showConditions);
    e.stopPropagation();
  };
  const submit = () => {
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
                    class="bg-grayellow-200 h-5 outline-none p-3"
                    id="food"
                    placeholder="りんご"
                    value={foodInput}
                    onChange={(e) =>
                      setFoodInput((e.target as HTMLInputElement).value)}
                    onFocus={() => setFoodFocus(true)}
                    onBlur={() => setFoodFocus(false)}
                  />
                  <div class="relative">
                    {foodFocus && (
                      <ul class="absolute bg-white top-0 right-0 w-full rounded-b-sm border">
                        {foods.filter((food) =>
                          foodInput !== "" && food.name.indexOf(foodInput) > -1
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
                    />
                    <select class="outline-none">
                      {expiredTypeList.map((expiredType) => (
                        <option value={expiredType.id}>
                          {expiredType.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div class="">
                  <label>State</label>
                  <div class="relative h-[37px]">
                    <div class="absolute top-0 bg-white border rounded-md">
                      {conditionList.map((condition) => (
                        <div
                          class={`text-[${condition.color}] ${
                            selectCondition === condition.id || showConditions
                              ? "flex"
                              : "hidden"
                          } cursor-pointer items-center pl-2 h-[35px] w-[300px]`}
                          onClick={(e) => clickCondition(e, condition.id)}
                        >
                          <ConditionIcon condition={condition} />
                          {condition.message}
                          {!showConditions && (
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
                  />
                </div>
              </form>
              <div class="space-x-2 flex justify-end">
                <button
                  class="bg-orange-400 text-white px-6 py-3 rounded-md focus:outline-none"
                  onClick={() => submit()}
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
