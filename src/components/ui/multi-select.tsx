import * as React from "react";
import { CaretSortIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

import { Badge } from "./badge";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "~/lib/utils";
import { PlusCircle } from "lucide-react";

export interface OptionType {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: OptionType[];
  selected: string[];
  onChange:
    | React.Dispatch<React.SetStateAction<string[]>>
    | ((value: string[]) => void);
  className?: string;
}

function MultiSelect({
  options: initialOptions,
  selected,
  onChange,
  className,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<OptionType[]>(initialOptions);

  const [commandInput, setCommandInput] = React.useState("");

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            `w-full justify-between ${selected.length > 1 ? "h-full" : "h-10"}`,
            className,
          )}
          onClick={() => setOpen(!open)}
        >
          <div className="flex flex-wrap gap-1">
            {selected.map((item) => (
              <Badge
                variant="outline"
                key={item}
                className="mb-1 mr-1"
                onClick={() => handleUnselect(item)}
              >
                {options.find((option) => option.value === item)?.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <Cross2Icon className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
          </div>
          <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search ..."
            value={commandInput}
            onValueChange={setCommandInput}
          />
          <CommandEmpty>Vazio</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange(
                    selected.includes(option.value)
                      ? selected.filter((item) => item !== option.value)
                      : [...selected, option.value],
                  );
                  if (!initialOptions.includes(option))
                    setOptions(
                      initialOptions.filter((item) => item !== option),
                    );
                  setOpen(true);
                }}
              >
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(option.value)
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
            {commandInput.length > 0 && (
              <CommandItem
                onSelect={() => {
                  setOptions([
                    ...options,
                    { label: commandInput, value: commandInput },
                  ]);
                  onChange([...selected, commandInput]);
                  setCommandInput("");
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4 text-muted-foreground" />{" "}
                Add {commandInput}
              </CommandItem>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
