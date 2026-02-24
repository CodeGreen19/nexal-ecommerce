import { toast } from "sonner";
import { MutationResult } from "../db/return";

export function showToast(res: MutationResult) {
  if (res.success) {
    toast.success(res.success.message);
  }
  if (res.error) {
    toast.error(res.error.message);
  }
}
