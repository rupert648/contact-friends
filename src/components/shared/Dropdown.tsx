import type { SetStateAction, Dispatch } from "react";
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { ChevronDownIcon } from "../icons";

interface DropdownProps<T> {
  options: { optionName: string; value: T }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setActive: Dispatch<SetStateAction<T>>;
  active: string;
  placeholder: string;
}

const Dropdown = <T,>({
  options,
  setActive,
  active,
  placeholder,
}: DropdownProps<T>) => {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const optionItems = options.map((option) => (
    <Menu.Item key={option.optionName}>
      {({ active }) => (
        <a
          href="#"
          className={classNames(
            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
            "block px-4 py-2 text-sm"
          )}
          onClick={() => {
            setActive(option.value);
          }}
        >
          {option.optionName}
        </a>
      )}
    </Menu.Item>
  ));

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="mx-4 inline-flex w-32 justify-center rounded-md bg-orange-500 py-1 px-1 text-sm  text-white hover:bg-orange-700">
          {active ? active : placeholder}
          <ChevronDownIcon />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">{optionItems}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
