import type { Comment } from '@/shared/model';
import { ProfileAvatar } from '@/shared/ui';

interface CommentDetailProps {
  comment: Comment;
}

export default function CommentDetail({ comment }: CommentDetailProps) {
  return (
    <>
      <ProfileAvatar size="lg" src={comment.author.image} alt={comment.author.username} />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-foreground font-semibold">{comment.author.username}</span>
            <span className="text-muted-foreground text-xs">
              · {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <button
            className="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-6 w-6 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-_r_5d_"
            data-state="closed"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-muted-foreground h-4 w-4"
            >
              <path
                d="M9 9.75001C9.41421 9.75001 9.75 9.41423 9.75 9.00001C9.75 8.5858 9.41421 8.25002 9 8.25002C8.58579 8.25002 8.25 8.5858 8.25 9.00001C8.25 9.41423 8.58579 9.75001 9 9.75001Z"
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M9 4.49999C9.41421 4.49999 9.75 4.1642 9.75 3.74999C9.75 3.33577 9.41421 2.99999 9 2.99999C8.58579 2.99999 8.25 3.33577 8.25 3.74999C8.25 4.1642 8.58579 4.49999 9 4.49999Z"
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M9 15C9.41421 15 9.75 14.6642 9.75 14.25C9.75 13.8358 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.8358 8.25 14.25C8.25 14.6642 8.58579 15 9 15Z"
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
        </div>
        <p className="text-foreground text-sm leading-relaxed">{comment.content}</p>
      </div>
    </>
  );
}
