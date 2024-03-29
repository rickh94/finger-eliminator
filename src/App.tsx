import { Emit, Listen, createEventBus } from "@solid-primitives/event-bus";
import { Component, Show, createSignal } from "solid-js";

function App() {
  const reset = createEventBus();
  return (
    <div class="w-screen h-dvh bg-[#ca8b46] overflow-y-hidden fixed">
      <Reset emit={reset.emit} />
      <div class="grid grid-cols-4 gap-0 mx-auto max-w-3xl h-full">
        <ViolinString stringName="G" listen={reset.listen}></ViolinString>
        <ViolinString stringName="D" listen={reset.listen}></ViolinString>
        <ViolinString stringName="A" listen={reset.listen}></ViolinString>
        <ViolinString stringName="E" listen={reset.listen}></ViolinString>
      </div>
    </div>
  );
}

const Reset: Component<{ emit: Emit }> = (props) => {
  return (
    <button
      onclick={() => props.emit()}
      class="flex absolute top-0 left-1/2 justify-center cursor-pointer z-50 items-center py-1 px-4 mt-4 text-xl font-bold text-white bg-red-500 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 opacity-85 active:transform active:scale-110"
    >
      Reset
    </button>
  );
};

const ViolinString: Component<{
  stringName: "E" | "A" | "D" | "G";
  listen: Listen<unknown>;
}> = (props) => {
  const eliminate = createEventBus();
  return (
    <section
      class="overflow-x-hidden relative h-full transform"
      classList={{
        "rotate-2": props.stringName === "G",
        "rotate-1": props.stringName === "D",
        "-rotate-1": props.stringName === "A",
        "-rotate-2": props.stringName === "E",
      }}
    >
      <div
        class="absolute left-0 w-1/2 h-full border-l-4 transform translate-x-full border-slate-600"
        classList={{
          "border-l-4": props.stringName === "G",
          "border-l-2": props.stringName === "A" || props.stringName === "D",
          "border-l": props.stringName === "E",
        }}
      ></div>
      <div class="flex pt-6 absolute top-0 left-0 flex-col justify-center items-center w-1/2 h-full translate-x-1/2">
        <button
          onclick={() => eliminate.emit()}
          class="flex active:scale-110 justify-center items-center py-1 mb-8 w-full text-xl font-bold text-yellow-900 rounded-full border-2 border-yellow-800 shadow opacity-100 bg-stone-50"
        >
          {props.stringName} <span class="ml-1 hidden md:inline">String</span>
        </button>
        <div class="flex flex-col gap-12 sm:gap-20">
          <ViolinFinger
            eliminateListener={eliminate.listen}
            resetListener={props.listen}
            num={0}
          ></ViolinFinger>
          <ViolinFinger
            eliminateListener={eliminate.listen}
            resetListener={props.listen}
            num={1}
          ></ViolinFinger>
          <ViolinFinger
            eliminateListener={eliminate.listen}
            resetListener={props.listen}
            num={2}
          ></ViolinFinger>
          <ViolinFinger
            eliminateListener={eliminate.listen}
            resetListener={props.listen}
            num={3}
          ></ViolinFinger>
          <ViolinFinger
            eliminateListener={eliminate.listen}
            resetListener={props.listen}
            num={4}
          ></ViolinFinger>
        </div>
      </div>
    </section>
  );
};

const ViolinFinger: Component<{
  resetListener: Listen<unknown>;
  eliminateListener: Listen<unknown>;
  num: 0 | 1 | 2 | 3 | 4;
}> = (props) => {
  const [marked, setMarked] = createSignal(false);

  props.resetListener(() => {
    setMarked(false);
  });

  props.eliminateListener(() => {
    setMarked(true);
  });

  return (
    <Show
      when={marked()}
      fallback={
        <button
          onclick={() => setMarked(true)}
          class="select-none animate-in duration-100 ease-in-out zoom-in-110 active:scale-110 flex justify-center items-center text-xl font-bold text-yellow-900 bg-white rounded-full border-2 border-yellow-900 sm:text-4xl opacity-85 size-10 sm:size-20"
        >
          {props.num}
        </button>
      }
    >
      <div class="select-none animate-in zoom-in-110 duration-100 ease-in-out active:scale-110 flex justify-center items-center text-xl font-bold text-red-700 bg-red-200 rounded-full border-2 border-red-500 sm:text-4xl opacity-85 size-10 sm:size-20">
        X
      </div>
    </Show>
  );
};

export default App;
