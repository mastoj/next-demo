import { Toggle } from "./toggle";

export const FlagValue = ({
  flag,
  value,
}: {
  flag: string;
  value: boolean;
}) => {
  return (
    <div className="flex gap-4 items-center">
      {flag}: <Toggle value={value} />
    </div>
  );
};
