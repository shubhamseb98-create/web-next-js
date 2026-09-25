export function createReorderHandler({ entity, rows, setRows, sort, setSort, search, addToast, onRefresh }) {
  return async function handleReorder(newOrderList) {
    if (setSort && sort !== 'sort') {
      setSort('sort');
    }

    const renumbered = newOrderList.map((item, index) => ({
      ...item,
      sort: index + 1
    }));

    if (search && search.trim()) {
      const searchIds = new Set(renumbered.map(x => x._id || x.id));
      const remainingRows = rows.filter(r => !searchIds.has(r._id || r.id));
      setRows([...renumbered, ...remainingRows]);
    } else {
      setRows(renumbered);
    }

    try {
      const res = await fetch('/api/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity,
          items: renumbered.map(item => ({ _id: item._id || item.id, sort: item.sort }))
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save order');
      if (addToast) addToast('Position updated successfully!', 'success');
    } catch (err) {
      if (addToast) addToast(err.message || 'Failed to update order', 'error');
      if (onRefresh) onRefresh();
    }
  };
}
