import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, Trash2, Plus, ArrowDownUp } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

export default function TableToolbar({
  search,
  onSearchChange,
  sort,
  onSortChange,
  selectedCount = 0,
  onBulkDelete,
  bulkDeleting = false,
  onAdd,
  addLabel = 'Add New',
  extraActions,
  extraFilters
}) {
  const SORT_OPTIONS = [
    { value: 'latest', label: 'Latest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'a-z', label: 'A - Z' },
    { value: 'z-a', label: 'Z - A' }
  ];

  const currentSortLabel = SORT_OPTIONS.find(o => o.value === sort)?.label || 'Sort By';

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
      {/* Left side: Search & Sort */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ position: 'relative', width: '256px' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94a3b8' }} />
          <input 
            placeholder="Search..." 
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            style={{ width: '100%', height: '40px', padding: '8px 16px 8px 36px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', color: '#f8fafc', outline: 'none', fontSize: '14px' }}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button style={{ height: '40px', padding: '0 16px', borderRadius: '999px', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>
              <ArrowDownUp style={{ width: '16px', height: '16px', color: '#94a3b8' }} />
              {currentSortLabel}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40 rounded-xl shadow-lg border-border/40">
            {SORT_OPTIONS.map(opt => (
              <DropdownMenuItem 
                key={opt.value} 
                onClick={() => onSortChange(opt.value)}
                style={{ 
                  cursor: 'pointer', 
                  padding: '8px 12px', 
                  borderRadius: '6px', 
                  color: sort === opt.value ? '#52a436' : 'white', 
                  fontWeight: sort === opt.value ? 'bold' : 'normal',
                  backgroundColor: sort === opt.value ? 'rgba(82, 164, 54, 0.1)' : 'transparent',
                  marginBottom: '4px'
                }}
                onMouseEnter={(e) => { if (sort !== opt.value) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={(e) => { if (sort !== opt.value) e.currentTarget.style.backgroundColor = 'transparent' }}
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {extraFilters}
      </div>

      {/* Right side: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {selectedCount > 0 && (
          <button 
            onClick={onBulkDelete} 
            disabled={bulkDeleting} 
            style={{ height: '40px', padding: '0 16px', borderRadius: '999px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500, cursor: 'pointer' }}
          >
            {bulkDeleting ? (
              <span className="w-4 h-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
            ) : (
              <Trash2 style={{ width: '16px', height: '16px' }} />
            )}
            {bulkDeleting ? 'Deleting...' : `Delete (${selectedCount})`}
          </button>
        )}
        
        {extraActions}

        {onAdd && (
          <button 
            onClick={onAdd} 
            style={{ height: '40px', padding: '0 20px', borderRadius: '999px', backgroundColor: '#52a436', color: 'white', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 15px rgba(82, 164, 54, 0.3)', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#3e8027'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#52a436'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Plus style={{ width: '16px', height: '16px' }} /> {addLabel}
          </button>
        )}
      </div>
    </div>
  );
}
