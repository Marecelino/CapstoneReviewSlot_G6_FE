export const API_BASE_URL = 'http://localhost:5194';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  MANAGER_DASHBOARD: '/dashboard/admin',
  MANAGER_CAMPAIGNS: '/dashboard/admin/campaigns',
  MANAGER_CAMPAIGN_CREATE: '/dashboard/admin/campaigns/create',
  MANAGER_CAMPAIGN_EDIT: '/dashboard/admin/campaigns/:id/edit',
  MANAGER_SLOTS: '/dashboard/admin/slots',
  MANAGER_SLOTS_CREATE: '/dashboard/admin/slots/create',
  MANAGER_LECTURERS: '/dashboard/admin/lecturers',
  MANAGER_LECTURERS_IMPORT: '/dashboard/admin/lecturers/import',
  MANAGER_ASSIGNMENTS: '/dashboard/admin/assignments',
  MANAGER_ASSIGNMENT_CREATE: '/dashboard/admin/assignments/create',
  MANAGER_ASSIGNMENT_MANAGE: '/dashboard/admin/assignments/:id/manage-reviewers',
  LECTURER_DASHBOARD: '/dashboard/lecturer',
  LECTURER_AVAILABILITY: '/dashboard/lecturer/availability',
  LECTURER_MY_AVAILABILITY: '/dashboard/lecturer/my-availability',
  LECTURER_MY_REVIEWS: '/dashboard/lecturer/my-reviews',
  STUDENT_DASHBOARD: '/dashboard/student',
  STUDENT_REGISTRATION: '/dashboard/student/registration',
  STUDENT_MY_REGISTRATIONS: '/dashboard/student/my-registrations',
  STUDENT_MY_ASSIGNMENTS: '/dashboard/student/my-assignments',
} as const;

export const ROLE_DASHBOARD: Record<string, string> = {
  Manager: ROUTES.MANAGER_DASHBOARD,
  Lecturer: ROUTES.LECTURER_DASHBOARD,
  Student: ROUTES.STUDENT_DASHBOARD,
};
