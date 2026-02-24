
import { useNavigate } from 'react-router-dom';


  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        fontFamily: 'sans-serif',
        padding: 24,
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <img
          src="/404-mascot.png"
          alt="404 mascot"
          style={{ width: 120, height: 'auto', display: 'block', margin: '0 auto' }}
          onError={e => {
            // fallback: simple emoji if mascot image is missing
            (e.target as HTMLImageElement).style.display = 'none';
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent && !parent.querySelector('.fallback-emoji')) {
              const emoji = document.createElement('div');
              emoji.className = 'fallback-emoji';
              emoji.style.fontSize = '80px';
              emoji.style.textAlign = 'center';
              emoji.textContent = '😵';
              parent.appendChild(emoji);
            }
          }}
        />
      </div>
      <div style={{ fontSize: 40, fontWeight: 700, color: '#A3C67A', marginBottom: 8 }}>404</div>
      <div style={{ fontSize: 18, color: '#888', marginBottom: 32, textAlign: 'center' }}>
        페이지를 찾을 수 없습니다.<br />
        요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          style={{
            background: '#A3C67A',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            padding: '10px 32px',
            fontSize: 16,
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #E2EFCB',
            marginRight: 4,
          }}
          onClick={() => navigate('/')}
        >
          홈으로
        </button>
        <button
          style={{
            background: '#E2EFCB',
            color: '#A3C67A',
            border: 'none',
            borderRadius: 20,
            padding: '10px 32px',
            fontSize: 16,
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #F3F6E7',
          }}
          onClick={() => navigate(-1)}
        >
          이전 페이지
        </button>
      </div>
    </div>
  );
};


