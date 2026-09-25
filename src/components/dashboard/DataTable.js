'use client';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { MoreVertical, ChevronLeft, ChevronRight, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';

export default function DataTable({ 
  columns, 
  data, 
  loading,
  onRowClick,
  actions = true,
  pagination = true,
  selectedIds = [],
  onToggleSelectAll,
  onToggleSelectRow,
  isDraggable = false,
  onReorder
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const canDrag = isDraggable || !!onReorder;

  const handleDragStart = (e, idx) => {
    setDraggedIndex(idx);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(idx));
  };

  const handleDragOver = (e, idx) => {
    if (draggedIndex === null) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== idx) {
      setDragOverIndex(idx);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e, targetIdx) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === undefined) return;
    if (draggedIndex === targetIdx) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...data];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(targetIdx, 0, movedItem);

    setDraggedIndex(null);
    setDragOverIndex(null);

    if (onReorder) {
      onReorder(updated, draggedIndex, targetIdx);
    }
  };

  const handleMoveQuick = (e, index, direction) => {
    e.stopPropagation();
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= data.length) return;

    const updated = [...data];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    if (onReorder) {
      onReorder(updated, index, targetIndex);
    }
  };

  const totalCols = columns.length 
    + (onToggleSelectAll !== undefined ? 1 : 0) 
    + (actions ? 1 : 0) 
    + (canDrag ? 1 : 0);

  return (
    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <tr>
              {canDrag && (
                <th 
                  style={{ 
                    padding: '16px 8px 16px 16px', 
                    width: '56px', 
                    textAlign: 'center',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                  title="Drag rows to change position"
                >
                  <GripVertical style={{ width: '15px', height: '15px', margin: '0 auto', color: '#64748b' }} />
                </th>
              )}
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
                   <td colSpan={totalCols} style={{ padding: '24px', backgroundColor: 'transparent' }}>
                      <div className="animate-pulse" style={{ height: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', width: '100%' }} />
                   </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={totalCols} style={{ padding: '48px 24px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, idx) => {
                const isItemDragged = draggedIndex === idx;
                const isItemOver = dragOverIndex === idx && !isItemDragged;
                const insertAbove = isItemOver && draggedIndex !== null && draggedIndex > idx;
                const insertBelow = isItemOver && draggedIndex !== null && draggedIndex < idx;

                return (
                  <tr 
                    key={row._id || row.id || idx} 
                    draggable={canDrag}
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDragEnd={handleDragEnd}
                    onDrop={(e) => handleDrop(e, idx)}
                    style={{ 
                      borderBottom: insertBelow ? '2px solid #52a436' : '1px solid rgba(255, 255, 255, 0.03)',
                      borderTop: insertAbove ? '2px solid #52a436' : 'none',
                      cursor: canDrag ? 'grab' : 'pointer', 
                      transition: 'background-color 0.15s, opacity 0.15s',
                      opacity: isItemDragged ? 0.35 : 1,
                      backgroundColor: isItemDragged 
                        ? 'rgba(82, 164, 54, 0.12)' 
                        : isItemOver
                        ? 'rgba(82, 164, 54, 0.08)'
                        : 'transparent'
                    }}
                    onClick={() => onRowClick?.(row)}
                    onMouseEnter={(e) => {
                      if (draggedIndex === null && dragOverIndex === null) {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (draggedIndex === null && dragOverIndex === null) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {canDrag && (
                      <td 
                        style={{ padding: '12px 6px 12px 14px', textAlign: 'center', width: '56px' }}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                          <div
                            title="Drag up or down to change position"
                            style={{
                              padding: '5px',
                              borderRadius: '6px',
                              cursor: 'grab',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: isItemDragged ? '#52a436' : '#94a3b8',
                              transition: 'all 0.15s'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#52a436'; e.currentTarget.style.backgroundColor = 'rgba(82, 164, 54, 0.15)'; }}
                            onMouseLeave={(e) => { if (!isItemDragged) { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.backgroundColor = 'transparent'; } }}
                          >
                            <GripVertical style={{ width: '16px', height: '16px' }} />
                          </div>
                          
                          {/* Quick Up/Down buttons */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={(e) => handleMoveQuick(e, idx, -1)}
                              title="Move Up"
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: '2px',
                                cursor: idx === 0 ? 'not-allowed' : 'pointer',
                                color: idx === 0 ? '#334155' : '#94a3b8',
                                opacity: idx === 0 ? 0.3 : 0.8,
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '3px',
                                transition: 'all 0.15s'
                              }}
                              onMouseEnter={(e) => { if (idx !== 0) { e.currentTarget.style.color = '#52a436'; e.currentTarget.style.backgroundColor = 'rgba(82, 164, 54, 0.15)'; } }}
                              onMouseLeave={(e) => { if (idx !== 0) { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.backgroundColor = 'transparent'; } }}
                            >
                              <ChevronUp style={{ width: '13px', height: '13px' }} />
                            </button>
                            <button
                              type="button"
                              disabled={idx === data.length - 1}
                              onClick={(e) => handleMoveQuick(e, idx, 1)}
                              title="Move Down"
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: '2px',
                                cursor: idx === data.length - 1 ? 'not-allowed' : 'pointer',
                                color: idx === data.length - 1 ? '#334155' : '#94a3b8',
                                opacity: idx === data.length - 1 ? 0.3 : 0.8,
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '3px',
                                transition: 'all 0.15s'
                              }}
                              onMouseEnter={(e) => { if (idx !== data.length - 1) { e.currentTarget.style.color = '#52a436'; e.currentTarget.style.backgroundColor = 'rgba(82, 164, 54, 0.15)'; } }}
                              onMouseLeave={(e) => { if (idx !== data.length - 1) { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.backgroundColor = 'transparent'; } }}
                            >
                              <ChevronDown style={{ width: '13px', height: '13px' }} />
                            </button>
                          </div>
                        </div>
                      </td>
                    )}
                    {onToggleSelectAll !== undefined && (
                      <td 
                        style={{ padding: '16px 24px', textAlign: 'center' }} 
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
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
                      <td 
                        style={{ padding: '16px 24px', textAlign: 'right' }} 
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <button style={{ padding: '8px', color: '#94a3b8', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}>
                          <MoreVertical style={{ width: '20px', height: '20px' }} />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <div style={{ padding: '16px 24px', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
            Total <span style={{ fontWeight: 600, color: 'white' }}>{data.length}</span> items
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
