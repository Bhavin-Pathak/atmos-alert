const ErrorMessage = ({ message }) => (
  <div className="bg-red-500/20 backdrop-blur-md rounded-2xl p-4 border border-red-500/30 text-center">
    <p className="text-white">{message}</p>
  </div>
);

export default ErrorMessage;
