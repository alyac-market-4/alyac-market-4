export const FormErrorMessage = ({ message }: { message: string | null }) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/10 text-destructive mt-8 flex rounded-lg p-4 text-sm">
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};
