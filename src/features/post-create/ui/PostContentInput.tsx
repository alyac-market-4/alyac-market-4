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
      className="bg-muted min-h-[260px] w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none"
    />
  );
}
