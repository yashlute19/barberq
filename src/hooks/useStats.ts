import { useState, useEffect } from 'react';
import axios from 'axios';

export function useStats(salonId: string) {
  const [stats, setStats] = useState({
    bookingsToday: 0,
    revenueToday: 0,
    activeQueue: 0,
    upcomingBookings: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!salonId) return;

    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/admin/stats?salonId=${salonId}`);
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (err: any) {
         setError(err.response?.data?.error || 'Failed to load stats');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
    // Refresh stats every 30s
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [salonId]);

  return { stats, isLoading, error };
}
