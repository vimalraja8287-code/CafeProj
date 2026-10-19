import React from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div
      style={{
        position: 'relative',
        marginBottom: '1.25rem',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Search size={18} />
      </div>
      <input
        type="text"
        placeholder="Search for samosas, coffee, sandwiches..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem 2.5rem 0.75rem 2.5rem',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid #EFE8DD',
          backgroundColor: '#FFFFFF',
          fontSize: '0.925rem',
          color: 'var(--text-primary)',
          outline: 'none',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all 0.2s ease',
        }}
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
