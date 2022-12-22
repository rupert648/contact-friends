import type { Dispatch, SetStateAction } from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

interface MultiInputProps {
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  options: string[];
  label: string;
}

function MultiInput({
  selected,
  setSelected,
  options,
  label,
}: MultiInputProps) {
  return (
    <>
      <Listbox value={selected} onChange={setSelected} multiple>
        <Listbox.Label className="mb-2 block text-sm font-bold text-gray-700">
          {label}
        </Listbox.Label>
        <Listbox.Button className="focus:shadow-outline mb-1 w-full appearance-none rounded border py-2 px-3 text-left leading-tight text-gray-700 shadow focus:outline-none">
          <span className="block truncate">
            {selected.length > 0 ? (
              <div className="flex">
                {selected.map((tag) => (
                  <div key="tag" className="mx-1 rounded border px-6 text-left">
                    <p>{tag}</p>
                  </div>
                ))}
              </div>
            ) : (
              "none selected"
            )}
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((s) => (
              <Listbox.Option
                key={s}
                value={s}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {s}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </>
  );
}

export default MultiInput;
