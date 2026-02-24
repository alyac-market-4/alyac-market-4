import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog';

export interface ConfirmDialogProps {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
  actionText: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ConfirmDialog({
  title,
  description,
  onCancel,
  onConfirm,
  actionText,
  open,
  onOpenChange,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm" className="p-0">
        <AlertDialogHeader className="px-4 pt-8 pb-6">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-1 gap-0">
          <AlertDialogCancel
            className="h-12 flex-1 rounded-none rounded-bl-lg border-t border-r px-4 py-2"
            variant="ghost"
            onClick={onCancel}
          >
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            className="h-12 flex-1 rounded-none rounded-br-lg border-t border-l px-4 py-2"
            variant="ghost"
            onClick={onConfirm}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
