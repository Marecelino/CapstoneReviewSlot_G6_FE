import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ'),
  password: z
    .string()
    .min(1, 'Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email là bắt buộc')
      .email('Email không hợp lệ'),
    fullName: z
      .string()
      .min(1, 'Họ tên là bắt buộc')
      .max(200, 'Họ tên không được vượt quá 200 ký tự'),
    password: z
      .string()
      .min(1, 'Mật khẩu là bắt buộc')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export const campaignSchema = z.object({
  name: z
    .string()
    .min(1, 'Tên chiến dịch là bắt buộc')
    .max(200, 'Tên không được vượt quá 200 ký tự'),
  startTime: z
    .string()
    .min(1, 'Ngày bắt đầu là bắt buộc'),
  endTime: z
    .string()
    .min(1, 'Ngày kết thúc là bắt buộc'),
  maxGroupsPerLecturer: z
    .number()
    .int('Phải là số nguyên')
    .min(1, 'Tối thiểu 1')
    .max(20, 'Tối đa 20'),
  requiredReviewersPerGroup: z
    .number()
    .int('Phải là số nguyên')
    .min(1, 'Tối thiểu 1')
    .max(5, 'Tối đa 5'),
}).refine((data) => {
  const start = new Date(data.startTime);
  const end = new Date(data.endTime);
  return end > start;
}, {
  message: 'Ngày kết thúc phải sau ngày bắt đầu',
  path: ['endTime'],
});

export const slotBatchSchema = z.object({
  campaignId: z.string().min(1, 'Vui lòng chọn chiến dịch'),
  slots: z
    .array(
      z.object({
        reviewDate: z.string().min(1, 'Ngày là bắt buộc'),
        slotNumber: z.number().int().min(1, 'Tối thiểu 1'),
        startTime: z.string().min(1, 'Giờ bắt đầu là bắt buộc'),
        endTime: z.string().min(1, 'Giờ kết thúc là bắt buộc'),
        maxCapacity: z.number().int().min(1, 'Tối thiểu 1').max(20, 'Tối đa 20'),
        room: z.string().max(100).optional(),
      }),
    )
    .min(1, 'Phải có ít nhất 1 slot'),
});

export const importLecturerSchema = z.object({
  email: z.string().min(1).email('Email không hợp lệ'),
  fullName: z.string().min(1, 'Họ tên là bắt buộc'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  lecturerCode: z.string().min(1, 'Mã giảng viên là bắt buộc').max(50),
  department: z.string().max(100).optional(),
});

export const assignmentSchema = z.object({
  capstoneGroupId: z.string().min(1, 'Vui lòng chọn nhóm'),
  reviewSlotId: z.string().min(1, 'Vui lòng chọn slot'),
  reviewerIds: z
    .array(z.string())
    .length(2, 'Phải chọn đúng 2 giảng viên phản biện'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CampaignFormData = z.infer<typeof campaignSchema>;
export type SlotBatchFormData = z.infer<typeof slotBatchSchema>;
export type ImportLecturerFormData = z.infer<typeof importLecturerSchema>;
export type AssignmentFormData = z.infer<typeof assignmentSchema>;
