import Link from 'next/link';

const Button = ({ children, href = '/', className = "", ...props }) => {
  return (
    <Link href={href}>
      <button
        style={{
          padding: '12px 28px',
          backgroundColor: 'transparent',
          border: '1px solid #facc15',
          color: '#facc15',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '6px',
        }}
        onMouseEnter={e => {
          e.target.style.backgroundColor = '#facc15';
          e.target.style.color = '#1e293b';
        }}
        onMouseLeave={e => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#facc15';
        }}
        className={className}
        {...props}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;
