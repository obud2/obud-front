/**
 * We Use FeatureFlag for feature toggling
 *
 * only use LocalStorage for feature flag
 */

import { StorageKey } from '@/constants/LocalStorage';

const isPassFeatureEnabled = () => {
  if (typeof window === 'undefined') return false;

  const featureFlag = localStorage.getItem(StorageKey.FeatureFlag);

  const features = featureFlag?.split(',') ?? [];

  if (features.includes('PASS_FEATURE')) {
    return true;
  }

  return false;
};

export const FeatureFlagService = {
  isPassFeatureEnabled,
};
