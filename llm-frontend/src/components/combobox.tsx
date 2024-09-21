"use client";

import * as React from "react";
import { ChevronsUpDown, CheckIcon } from "lucide-react";
import { Button as MantineButton } from "@mantine/core"; // Mantine Button

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export const indexes = [
    {
        value: "gpt-3.5-turbo",
        label: "gpt-3.5-turbo",
    },
    {
        value: "gpt-4o-mini",
        label: "gpt-4o-mini",
    },
];

interface ComboboxProps {
    onChange: (value: string) => void;
    default?: string;
}

export function Combobox({
    onChange,
    default: defaultValue = "",
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(defaultValue);

    const handleSelect = (currentValue: string) => {
        const newValue = currentValue === value ? "" : currentValue;
        setValue(newValue);
        onChange(newValue);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <MantineButton
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    <div
                        style={{
                            display: "inline-block",
                            maxWidth: "160px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {value
                            ? indexes.find((indexes) => indexes.value === value)
                                  ?.label
                            : "Select database..."}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </MantineButton>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search index..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No index found.</CommandEmpty>
                        <CommandGroup>
                            {indexes.map((index) => (
                                <CommandItem
                                    key={index.value}
                                    value={index.value}
                                    onSelect={handleSelect}
                                >
                                    {index.label}
                                    <CheckIcon
                                        className={`ml-auto h-4 w-4 ${
                                            value === index.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
