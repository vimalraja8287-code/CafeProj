import React, { useState, useEffect } from 'react';
import { useTableNumber } from '../hooks/useTableNumber';
import { getMenuItems } from '../services/menuService';
import { MenuHeader } from '../components/menu/MenuHeader';
import { CategoryFilter } from '../components/menu/CategoryFilter';
import { SearchBar } from '../components/menu/SearchBar';
import { MenuItemCard } from '../components/menu/MenuItemCard';
import { StickyCartBar } from '../components/menu/StickyCartBar';
import { SearchX } from 'lucide-react';

export function MenuPage() {
  const { tableNumber } = useTableNumber();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function loadMenu() {
      try {
        setLoading(true);
        const data = await getMenuItems();
        if (isMounted) {
          setMenuItems(data);
        }
      } catch (err) {
        console.error('Failed to load menu items:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadMenu();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter items based on Category & Search term
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="container">
        <MenuHeader />

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <CategoryFilter activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

          {/* Loading Skeleton State */}
          {loading ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1.25rem',
                marginTop: '1.5rem',
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  style={{
                    height: '320px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#EFE8DD',
                    animation: 'fadeIn 0.5s ease infinite alternate',
                  }}
                />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            /* No results state */
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 1rem',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                marginTop: '1rem',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                }}
              >
                <SearchX size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--brand-espresso)', marginBottom: '0.5rem' }}>
                No dishes found
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                We couldn't find any items matching "{searchTerm}". Try another search or filter.
              </p>
              <button
                className="btn-secondary"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            /* Menu Items Grid */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1.25rem',
                marginTop: '1.25rem',
              }}
            >
              {filteredItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>

      <StickyCartBar tableNumber={tableNumber} />
    </div>
  );
}
