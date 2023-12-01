import { cn } from "@/utilities";

interface IProps {
  children: React.ReactNode;
  className?: string
  isCentered?: boolean
}

const Container: React.FC<IProps> = ({ isCentered, className, children }) => {
  return (
    <div className={cn("pt-[8rem] flex justify-center", { "items-center min-h-screen p-0": isCentered }, className)}>
      {children}
    </div>
  );
};

export default Container;
