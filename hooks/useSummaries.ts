import { useState, useEffect, useCallback } from 'react';
import { Summary } from '../services/summarizeService';
import * as storageService from '../services/storageService';

export default function useSummaries() {
    const [summaries, setSummaries] = useState<Summary[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const loadSummaries = useCallback(async () => {
        try {
            setIsLoading(true);
            const loadedSummaries = await storageService.getSummaries();
            setSummaries(loadedSummaries);
        } catch (err: any) {
            setError('Failed to load summaries');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteSummary = async (id: string) => {
        try {
            await storageService.deleteSummary(id);
            setSummaries(prev => prev.filter(summary => summary.id !== id));
        } catch (err: any) {
            setError('Failed to delete summary');
        }
    };

    // Load summaries on mount
    useEffect(() => {
        loadSummaries();
    }, [loadSummaries]);

    return {
        summaries,
        isLoading,
        error,
        refreshSummaries: loadSummaries,
        deleteSummary,
    };
}