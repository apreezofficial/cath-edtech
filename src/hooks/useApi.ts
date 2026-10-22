import {useCallback, useEffect, useState} from 'react';
import {ApiError} from '../api/client';

export function useApi<T>(load: () => Promise<T>, enabled = true) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<ApiError>();
  const [loading, setLoading] = useState(enabled);
  const refresh = useCallback(async () => { setLoading(true); setError(undefined); try { setData(await load()); } catch (err) { setError(err instanceof ApiError ? err : new ApiError('Unable to connect', 0)); } finally { setLoading(false); } }, [load]);
  useEffect(() => { if (enabled) void refresh(); }, [enabled, refresh]);
  return {data, error, loading, refresh};
}

