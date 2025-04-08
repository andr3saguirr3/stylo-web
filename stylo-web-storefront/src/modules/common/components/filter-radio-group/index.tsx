"use client"

import { RadioGroup, Radio } from "@headlessui/react"
import { CheckCircle } from 'lucide-react'
import clsx from "clsx"

type FilterRadioGroupProps<T extends string> = {
  title: string
  items: {
    value: T
    label: string
  }[]
  value: T
  handleChange: (value: T) => void
  "data-testid"?: string
}

const FilterRadioGroup = <T extends string>({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps<T>) => {
  return (
    <RadioGroup value={value} onChange={handleChange} className="w-full" data-testid={dataTestId}>
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          return (
            <Radio
              key={item.value}
              value={item.value}
              className={clsx(
                "flex items-center gap-2 text-sm cursor-pointer py-1.5 px-2 rounded-md transition-colors",
                {
                  "bg-gray-100": value === item.value,
                },
              )}
            >
              {({ checked }) => (
                <>
                  <span
                    className={clsx("flex items-center justify-center w-4 h-4", {
                      "text-black": checked,
                      "text-gray-400": !checked,
                    })}
                  >
                    {checked ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <div className="w-4 h-4 border border-gray-400 rounded-full" />
                    )}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </>
              )}
            </Radio>
          )
        })}
      </div>
    </RadioGroup>
  )
}

export default FilterRadioGroup
