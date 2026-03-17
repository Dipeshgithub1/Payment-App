import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-4">Page Not Found</p>
        <p className="text-gray-500 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Button 
            onClick={() => navigate("/dashboard")}
            label="Go to Dashboard"
          />
        </div>
      </div>
    </div>
  );
};
