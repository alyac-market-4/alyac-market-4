import { useRef, useState } from 'react';

import { ImagePlus } from 'lucide-react';
// 이미지 아이콘
import { toast } from 'sonner';

// 알림 메시지

import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
// 파일 업로드 API 훅
import { imageUrl } from '@/shared/lib/imageUrl';
// 이미지 경로 → 전체 URL로 변환해주는 함수
import { ImageFileButton } from '@/shared/ui/ImageFileButton';

// 우측 하단 이미지 변경 버튼

interface ProductImageUploadProps {
  initialImage?: string; // update일 때만 넘겨줌 (기존 이미지 경로), create는 안 넘겨도 됨
  onUploadComplete: (filenames: string[]) => void; // 업로드 완료 후 파일명 배열을 부모로 올려주는 함수
}

// 컴포넌트 밖에 선언 → 렌더링마다 재선언되지 않음
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB (바이트 단위: 5 × 1024 × 1024 = 5,242,880)

export const ProductImageUpload = ({ initialImage, onUploadComplete }: ProductImageUploadProps) => {
  // 이미지 미리보기 URL 상태
  // - update면 기존 이미지를 전체 URL로 변환해서 초기값으로 세팅
  // - create면 null (아무것도 안 보임)
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialImage ? imageUrl(initialImage) : null,
  );

  // 파일 업로드 API 훅
  // uploadMutation.mutate([file]) 호출하면 서버에 파일 업로드
  // uploadMutation.isPending → 업로드 중이면 true
  const uploadMutation = useUploadFiles();

  // 숨겨진 <input type="file"> 에 직접 접근하기 위한 ref
  // fileInputRef.current.click() 호출하면 파일 선택 창이 열림
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 선택한 파일 꺼내기 (없으면 종료)
    const file = e.target.files?.[0];
    if (!file) return;

    // ① 이미지 파일 형식 체크
    // file.type 예시: "image/jpeg", "image/png", "application/pdf"
    // startsWith('image/') → 이미지 형식이 아니면 막기
    if (!file.type.startsWith('image/')) {
      toast.error('이미지 파일만 업로드할 수 있습니다.');
      e.target.value = ''; // input 초기화 (같은 파일 다시 선택 가능하게)
      return;
    }

    // ② 파일 용량 체크 (5MB 초과 시 막기)
    // file.size 단위는 바이트
    if (file.size > MAX_FILE_SIZE) {
      toast.error('이미지는 5MB 이하만 업로드 가능합니다.');
      e.target.value = '';
      return;
    }

    // ③ 검증 통과 → 미리보기 즉시 표시
    // URL.createObjectURL(file) → 선택한 파일을 브라우저 내부 임시 URL로 변환
    // 서버 업로드 전에도 이미지를 바로 보여줄 수 있음
    setImagePreview(URL.createObjectURL(file));

    // ④ 서버에 파일 업로드
    uploadMutation.mutate([file], {
      onSuccess: (data) => {
        // 업로드 성공 → 서버에서 받은 파일명 배열을 부모(ProductForm)로 전달
        // 부모에서 이 파일명을 나중에 상품 등록/수정 API에 넘겨줌
        onUploadComplete(data.map((item) => item.filename));
      },
      onError: (error) => {
        // 업로드 실패 → 에러 토스트 표시
        if (error instanceof Error) toast.error('이미지 업로드에 실패했습니다.');
        // 미리보기를 원래 이미지로 복구
        // - update였으면 기존 이미지로 되돌림
        // - create였으면 null (빈 상태)로 되돌림
        setImagePreview(initialImage ? imageUrl(initialImage) : null);
      },
    });

    // ⑤ input 초기화 → 같은 파일을 다시 선택해도 onChange가 다시 실행되게 함
    e.target.value = '';
  };

  // 이미지 영역 클릭 시 숨겨진 input을 트리거해서 파일 선택 창 열기
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="text-muted-foreground block text-sm">이미지 등록</label>

      {/* 실제 파일 선택 input → 화면에는 안 보임 (className="hidden")
          버튼 클릭 시 handleButtonClick → fileInputRef.current.click()으로 트리거 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*" // 이미지 파일만 선택 가능
        className="hidden"
        onChange={handleFileChange}
      />

      {/* 이미지 미리보기 영역 */}
      <div className="bg-card border-border relative h-64 w-full overflow-hidden rounded-2xl border">
        <div
          className="hover:bg-muted/60 flex h-full w-full cursor-pointer flex-col items-center justify-center transition-colors"
          onClick={handleButtonClick} // 영역 어디든 클릭하면 파일 선택 창 열림
        >
          {/* imagePreview가 있으면 이미지 표시, 없으면 안내 아이콘 표시 */}
          {imagePreview ? (
            <img src={imagePreview} alt="상품 이미지" className="h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <ImagePlus className="text-muted-foreground size-8" />
              <span className="text-muted-foreground text-sm">이미지를 선택하세요</span>
            </div>
          )}
        </div>

        {/* 우측 하단 이미지 변경 버튼
            e.stopPropagation() → 버튼 클릭 시 부모 div의 onClick이 같이 실행되는 걸 막음
            (버튼만 클릭해도 파일 선택 창이 한 번만 열리게) */}
        <ImageFileButton
          onClick={(e) => {
            e.stopPropagation();
            handleButtonClick();
          }}
          className="border-border right-4 bottom-4 h-12 w-12 border bg-white/60 backdrop-blur-sm hover:bg-white"
        />
      </div>

      {/* 업로드 중일 때만 텍스트 표시 */}
      {uploadMutation.isPending && (
        <p className="text-muted-foreground text-xs">이미지 업로드 중...</p>
      )}
    </div>
  );
};
