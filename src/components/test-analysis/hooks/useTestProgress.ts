import { useEffect } from 'react';
import { useTest } from '../context/TestContext';
import { TestProgress } from '../types';

const AUTOSAVE_INTERVAL = 30000; // 30秒自动保存一次
const STORAGE_KEY = 'test_progress';

export function useTestProgress() {
  const { state, dispatch } = useTest();

  // 自动保存进度
  useEffect(() => {
    if (state.status !== 'in_progress') return;

    const saveProgress = () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
      dispatch({ type: 'SAVE_PROGRESS' });
    };

    const timer = setInterval(saveProgress, AUTOSAVE_INTERVAL);
    
    // 页面关闭前保存
    window.addEventListener('beforeunload', saveProgress);

    return () => {
      clearInterval(timer);
      window.removeEventListener('beforeunload', saveProgress);
    };
  }, [state.status, state.progress]);

  // 恢复保存的进度
  const restoreProgress = (): TestProgress | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to restore progress:', error);
      return null;
    }
  };

  // 清除保存的进度
  const clearProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    restoreProgress,
    clearProgress,
  };
} 