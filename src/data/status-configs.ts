export const STATUS_CONFIG = {
  pending: {
    label: 'Application Submitted',
    description: 'Your membership application has been received and is in queue',
    variant: 'secondary' as const,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  under_review: {
    label: 'Under Review',
    description: 'Our team is carefully reviewing your application details',
    variant: 'default' as const,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  approved: {
    label: 'Approved',
    description: 'Congratulations! Your membership has been approved successfully',
    variant: 'default' as const,
    color: 'bg-green-100 text-green-800 border-green-200',
  },
  rejected: {
    label: 'Application Rejected',
    description: 'Unfortunately, your application was not approved at this time',
    variant: 'destructive' as const,
    color: 'bg-red-100 text-red-800 border-red-200',
  },
};

export const statusSteps = ['pending', 'under_review', 'approved'];
