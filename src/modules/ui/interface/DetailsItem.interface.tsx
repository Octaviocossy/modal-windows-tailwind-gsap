import { cn } from "@/utilities";

interface IProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export const DetailsItem: React.FC<IProps> = ({ label, value, className }) => (
  <div className={cn("col-span-1 flex space-y-2 flex-col", className)}>
    <p>
      <span className="font-bold">{label}: </span>
      {value}
    </p>
    <div className="border-b" />
  </div>
);

