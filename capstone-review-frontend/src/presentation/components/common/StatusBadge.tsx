import { Chip } from '@mui/material';
import type { CampaignStatus } from '@/domain/entities/Campaign';
import type { AvailabilityStatus } from '@/domain/entities/Availability';
import type { AssignmentStatus } from '@/domain/entities/ReviewAssignment';

const CAMPAIGN_COLORS: Record<CampaignStatus, 'default' | 'success' | 'warning' | 'info'> = {
  Draft: 'default',
  Open: 'success',
  Closed: 'warning',
  Completed: 'info',
};

const CAMPAIGN_LABELS: Record<CampaignStatus, string> = {
  Draft: 'Nháp',
  Open: 'Mở',
  Closed: 'Đóng',
  Completed: 'Hoàn thành',
};

const AVAILABILITY_COLORS: Record<AvailabilityStatus, 'success' | 'error' | 'info'> = {
  Available: 'success',
  Cancelled: 'error',
  Assigned: 'info',
};

const AVAILABILITY_LABELS: Record<AvailabilityStatus, string> = {
  Available: 'Khả dụng',
  Cancelled: 'Đã hủy',
  Assigned: 'Đã phân công',
};

const ASSIGNMENT_COLORS: Record<AssignmentStatus, 'warning' | 'success' | 'error'> = {
  Pending: 'warning',
  Confirmed: 'success',
  Cancelled: 'error',
};

const ASSIGNMENT_LABELS: Record<AssignmentStatus, string> = {
  Pending: 'Đang chờ',
  Confirmed: 'Đã xác nhận',
  Cancelled: 'Đã hủy',
};

export type StatusType = CampaignStatus | AvailabilityStatus | AssignmentStatus;

interface StatusBadgeProps {
  status: StatusType;
  size?: 'small' | 'medium';
}

export function StatusBadge({ status, size = 'small' }: StatusBadgeProps) {
  if (status in CAMPAIGN_COLORS) {
    return (
      <Chip
        label={CAMPAIGN_LABELS[status as CampaignStatus]}
        color={CAMPAIGN_COLORS[status as CampaignStatus]}
        size={size}
      />
    );
  }

  if (status in AVAILABILITY_COLORS) {
    return (
      <Chip
        label={AVAILABILITY_LABELS[status as AvailabilityStatus]}
        color={AVAILABILITY_COLORS[status as AvailabilityStatus]}
        size={size}
      />
    );
  }

  if (status in ASSIGNMENT_COLORS) {
    return (
      <Chip
        label={ASSIGNMENT_LABELS[status as AssignmentStatus]}
        color={ASSIGNMENT_COLORS[status as AssignmentStatus]}
        size={size}
      />
    );
  }

  return <Chip label={status} size={size} />;
}
