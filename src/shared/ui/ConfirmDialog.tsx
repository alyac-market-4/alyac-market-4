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
  description?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelText?: string;
  actionText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isAlert?: boolean;
}

export function ConfirmDialog({
  title,
  description,
  onCancel,
  onConfirm,
  cancelText = '취소',
  actionText = '확인',
  open,
  onOpenChange,
  isAlert = false,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm" className="p-0">
        <AlertDialogHeader className="px-4 pt-8 pb-6">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-1 gap-0">
          <AlertDialogCancel
            className={`h-12 flex-1 divide-x rounded-none border-t px-4 py-2 ${isAlert ? 'rounded-b-lg' : 'rounded-bl-lg'}`}
            variant="ghost"
            onClick={onCancel}
          >
            {cancelText}
          </AlertDialogCancel>
          {!isAlert && (
            <AlertDialogAction
              className="h-12 flex-1 rounded-none rounded-br-lg border-t border-l px-4 py-2"
              variant="ghost"
              onClick={onConfirm}
            >
              {actionText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
