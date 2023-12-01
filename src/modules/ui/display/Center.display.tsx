interface IProps {
  children: React.ReactNode;
}

const Center: React.FC<IProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {children}
    </div>
  );
};
export default Center;
