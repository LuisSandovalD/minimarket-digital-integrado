// ========================================
// features/account/validations/updateAccount.schema.js
// ========================================

import * as z from "zod";

export const updateAccountSchema = z.object({
  name: z.string().min(3),

  email: z.string().email(),
});
