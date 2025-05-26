import { Clock } from "lucide-react";

export const TimePreparation = () => {
  return (
    <span className="ml-auto flex items-center gap-1">
      <Clock size={16} />
      <span>{Math.floor(Math.random() * 30) + 20} minutes</span>
    </span>
  );
};
// need this componet due the ssrs problems
export default TimePreparation;
