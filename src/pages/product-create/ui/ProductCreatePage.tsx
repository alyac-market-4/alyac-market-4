import { useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlus } from 'lucide-react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useProductMutation } from '@/entities/product';
import { useUploadFiles } from '@/entities/upload/hooks/useUploadFiles';
import { productCreateSchema } from '@/features/product-create/model/schemas';
import { BackButton } from '@/shared/ui/BackButton';
import { ImageFileButton } from '@/shared/ui/ImageFileButton';
import { Button } from '@/shared/ui/button';
import { Header } from '@/widgets/header';

export const ProductCreatePage = () => {
  const navigate = useNavigate();

  /**
   * 🔥 핵심
   * useForm 제네릭을 output 기준으로 맞춘다
   * (zodResolver가 transform까지 적용해줌)
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.input<typeof productCreateSchema>, undefined, z.output<typeof productCreateSchema>>(
    {
      resolver: zodResolver(productCreateSchema),
      mode: 'onChange',
      defaultValues: {
        productName: '',
        price: '',
        saleLink: '',
      },
    },
  );

  const { createMutation } = useProductMutation();
  const uploadMutation = useUploadFiles();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImageNames, setUploadedImageNames] = useState<string[]>([]);

  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    uploadMutation.mutate([file], {
      onSuccess: (data) => {
        setUploadedImageNames(data.map((item) => item.filename));
      },
      onError: (error) => {
        if (error instanceof Error) {
          alert('업로드 실패: ' + error.message);
        }
      },
    });
  };

  /**
   * 🔥 SubmitHandler로 정확히 타입 고정
   */
  const onSubmit: SubmitHandler<z.output<typeof productCreateSchema>> = (data) => {
    if (!uploadedImageNames.length) {
      alert('이미지를 업로드해 주세요.');
      return;
    }

    const productPayload = {
      itemName: data.productName,
      price: data.price,
      link: data.saleLink ?? '', // undefined 제거
      itemImage: uploadedImageNames.map((name) => `uploadFiles/${name}`).join(','),
    };

    createMutation.mutate(productPayload, {
      onSuccess: () => {
        alert('상품이 등록되었습니다.');
        navigate(-1);
      },
      onError: (error) => {
        if (error instanceof Error) {
          alert('등록 실패: ' + error.message);
        }
      },
    });
  };

  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <Button
            type="submit"
            disabled={createMutation.isPending}
            className="h-10 cursor-pointer rounded-full bg-[#6FCA3C]/50 px-6 py-1 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-[#5CB32A]"
          >
            {createMutation.isPending ? '저장 중...' : '저장'}
          </Button>
        }
      />

      <main className="bg-background flex-1 px-4 py-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 이미지 영역 */}
          <div className="space-y-2">
            <label className="text-muted-foreground block text-sm">이미지 등록</label>

            <div className="bg-card border-border relative h-64 w-full overflow-hidden rounded-2xl border">
              <div
                onClick={handleOpenFile}
                className="hover:bg-muted flex h-full w-full cursor-pointer flex-col items-center justify-center transition-colors"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="상품 이미지"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center">
                    <ImagePlus className="text-muted-foreground mb-2 size-8" />
                    <span className="text-muted-foreground text-sm">이미지를 선택하세요</span>
                  </div>
                )}
              </div>

              <ImageFileButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenFile();
                }}
                className="ring-offset-background border-border right-4 bottom-4 z-10 h-10 w-10 cursor-pointer border bg-white/60 backdrop-blur-sm transition-colors duration-200 hover:bg-white"
              />
            </div>

            <input
              ref={fileInputRef}
              onChange={handleImageChange}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* 상품명 */}
          <div>
            <label className="text-foreground text-sm font-medium">상품명</label>
            <input
              type="text"
              {...register('productName')}
              className="border-border text-foreground mt-2 w-full border-b bg-transparent py-3 focus:outline-none"
            />
            {errors.productName && (
              <p className="text-sm text-red-500">{errors.productName.message}</p>
            )}
          </div>

          {/* 가격 */}
          <div>
            <label className="text-foreground text-sm font-medium">가격</label>
            <input
              type="number"
              {...register('price', { valueAsNumber: true })}
              className="border-border text-foreground mt-2 w-full border-b bg-transparent py-3 focus:outline-none"
            />
            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
          </div>

          {/* 링크 */}
          <div>
            <label className="text-foreground text-sm font-medium">판매 링크</label>
            <input
              type="text"
              {...register('saleLink')}
              className="border-border text-foreground mt-2 w-full border-b bg-transparent py-3 focus:outline-none"
            />
            {errors.saleLink && <p className="text-sm text-red-500">{errors.saleLink.message}</p>}
          </div>
        </form>
      </main>
    </>
  );
};
