import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stressData = [
  { time: '9:00', stress: 3.2, heartRate: 72 },
  { time: '10:00', stress: 4.1, heartRate: 78 },
  { time: '11:00', stress: 6.8, heartRate: 85 },
  { time: '12:00', stress: 5.2, heartRate: 80 },
  { time: '13:00', stress: 3.9, heartRate: 75 },
  { time: '14:00', stress: 7.2, heartRate: 88 },
  { time: '15:00', stress: 8.5, heartRate: 92 },
  { time: '16:00', stress: 6.1, heartRate: 82 },
  { time: '17:00', stress: 4.3, heartRate: 76 }
];

export default function StressGraph() {
  const currentStressLevel = stressData[stressData.length - 1].stress;
  const getStressLabel = (level: number) => {
    if (level < 3) return { label: 'Low', color: 'text-success' };
    if (level < 6) return { label: 'Moderate', color: 'text-warning' };
    return { label: 'High', color: 'text-destructive' };
  };

  const stressInfo = getStressLabel(currentStressLevel);

  return (
    <Card className="glass p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Stress Level Monitoring</h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
            <span className={`font-medium ${stressInfo.color}`}>
              {stressInfo.label} ({currentStressLevel.toFixed(1)}/10)
            </span>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stressData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={[0, 10]}
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                labelFormatter={(label) => `Time: ${label}`}
                formatter={(value: number) => [`${value.toFixed(1)}/10`, 'Stress Level']}
              />
              <Line 
                type="monotone" 
                dataKey="stress" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--destructive))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center">
          <div className="text-center p-3 rounded-lg bg-surface">
            <p className="text-2xl font-bold text-destructive">{currentStressLevel.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">Current Stress Level</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Music therapy can help reduce stress levels by up to 65%
          </p>
        </div>
      </div>
    </Card>
  );
}