// ========================================
// features/account/validations/password.schema.js
// ========================================

import * as z from "zod";

export const passwordSchema = z.object({
  currentPassword: z.string().min(6),

  newPassword: z.string().min(6),
});
