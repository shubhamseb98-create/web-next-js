'use client';
import { cn } from '../../lib/utils';
import { MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DataTable({ 
  columns, 
  data, 
  loading,
  onRowClick,
  actions = true,
  pagination = true,
  selectedIds = [],
  onToggleSelectAll,
  onToggleSelectRow
}) {
  return (
    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <tr>
              {onToggleSelectAll !== undefined && (
                <th style={{ padding: '16px 24px', width: '48px', textAlign: 'center' }}>
                  <input 
                    type="checkbox" 
                    checked={data.length > 0 && selectedIds.length === data.length}
                    onChange={onToggleSelectAll}
                    style={{ borderRadius: '4px', cursor: 'pointer' }}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  style={{
                    padding: '16px 24px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    textAlign: col.align === 'right' ? 'right' : 'left'
                  }}
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                   <td colSpan={columns.length + 2} style={{ padding: '24px', backgroundColor: 'transparent' }}>
                      <div className="animate-pulse" style={{ height: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', width: '100%' }} />
                   </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} style={{ padding: '48px 24px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr 
                  key={row._id || row.id || idx} 
                  style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.03)', cursor: 'pointer', transition: 'background-color 0.2s' }}
                  onClick={() => onRowClick?.(row)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {onToggleSelectAll !== undefined && (
                    <td style={{ padding: '16px 24px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(row._id || row.id)}
                        onChange={() => onToggleSelectRow?.(row._id || row.id)}
                        style={{ borderRadius: '4px', cursor: 'pointer' }}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td 
                      key={col.key} 
                      style={{
                        padding: '16px 24px',
                        fontSize: '14px',
                        color: 'white',
                        textAlign: col.align === 'right' ? 'right' : 'left'
                      }}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td style={{ padding: '16px 24px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                      <button style={{ padding: '8px', color: '#94a3b8', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}>
                        <MoreVertical style={{ width: '20px', height: '20px' }} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <div style={{ padding: '16px 24px', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
            Page <span style={{ fontWeight: 600, color: 'white' }}>1</span> of <span style={{ fontWeight: 600, color: 'white' }}>10</span>
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ padding: '6px 12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'transparent', borderRadius: '6px', fontSize: '14px', fontWeight: 500, opacity: 0.5, cursor: 'not-allowed', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft style={{ width: '16px', height: '16px' }} />
            </button>
            <button style={{ padding: '6px 12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'transparent', borderRadius: '6px', fontSize: '14px', fontWeight: 500, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <ChevronRight style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
