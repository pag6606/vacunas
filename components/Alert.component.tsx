type AlertProps = {
  children: any;
};
const Alert: React.FC<AlertProps> = ({ children }) => {
  return (
    <div className='bg-red-700 mt-2 text-center py-2 rounded-lg text-slate-100 font-bold'>
      {children}
    </div>
  );
};

export default Alert;
