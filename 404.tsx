import { useNavigate } from 'react-router-dom';


import mascot404 from '@/shared/assets/images/full-logo-alyac-404.png';
import { Button } from '@/shared/ui';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  // ...existing code...
  const onClick2 = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#fff',
      }}
    >
      {/* Mascot image */}
      <img
        src={mascot404}
        alt="404 mascot"
        style={{ width: 97, height: 197, marginBottom: 8 }}
      />
      <div style={{ fontSize: 16, color: '#767676', marginTop: 8 }}>페이지를 찾을 수 없습니다. :(</div>
      <Button
        onClick={onClick2}
        style={{
          marginTop: 24,
          background: '#11CC27',
          color: '#fff',
          borderRadius: 90,
          padding: '27px 32px',
          fontSize: 16,
          fontWeight: 400,
        }}
      >
        이전 페이지
      </Button>
    </div>
  );
};
