const StatCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) => (
  <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
    <div>
      <div className="text-xs text-gray-500 font-semibold uppercase mb-1">
        {title}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
    <div className={`rounded-lg p-2 bg-${color}-100 text-${color}-600`}>
      {icon}
    </div>
  </div>
);

export default StatCard;
