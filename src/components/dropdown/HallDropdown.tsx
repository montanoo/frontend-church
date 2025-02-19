'use client';

import { Fragment, forwardRef } from 'react';
import { Menu, Transition, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  selected: string | null;
  onSelect: (value: string) => void;
}

const HallDropdown = forwardRef<HTMLInputElement, DropdownProps>(
  ({ options = [], selected, onSelect }, ref) => {
    return (
      <div>
        <input type="hidden" ref={ref} value={selected || ''} readOnly /> 
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              {selected || 'Selecciona una opción'}
              <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-500" />
            </MenuButton>
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
            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[100] max-h-[100px] overflow-y-scroll">
              {options?.map((option) => (
                <MenuItem key={option.value} as="div">
                  {({ active }) => (
                    <button
                      onClick={() => onSelect(option.value)}
                      className={`${
                        active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                    >
                      {option.label}
                    </button>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    );
  }
);

HallDropdown.displayName = 'HallDropdown';

export default HallDropdown;
