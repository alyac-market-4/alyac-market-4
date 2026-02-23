type Props = {
  value: string;
  onChangeValue: (next: string) => void;
};

export default function PostContentInput({ value, onChangeValue }: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChangeValue(e.target.value)}
      placeholder="게시글 입력하기."
      className="border-border bg-background min-h-[260px] w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
    />
  );
}
