type Props = {
  disabled: boolean;
  onClick: () => void;
};

export default function PostSubmitButton({ disabled, onClick }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="h-9 rounded-full bg-[#A7D676] px-4 text-sm font-medium text-white disabled:opacity-40"
    >
      업로드
    </button>
  );
}
