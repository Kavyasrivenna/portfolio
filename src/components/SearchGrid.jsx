// src/components/SearchGrid.jsx
import React, { useState, useMemo } from 'react';
import { FaSearch, FaTimes, FaArrowLeft, FaExternalLinkAlt, FaCompass } from 'react-icons/fa';
import { searchIndex } from '../data/searchIndex';

const popularKeywords = [
  'React',
  'Infosys',
  'Blood Donation',
  'DSA',
  'Node.js',
  'C++',
  'MongoDB',
  'Mentorship',
  'Google Cloud',
];

const categoryColors = {
  About: '#ec4899',
  Experience: '#f59e0b',
  Projects: '#10b981',
  Skills: '#6366f1',
  Education: '#3b82f6',
  Certification: '#8b5cf6',
  Contact: '#14b8a6',
};

const SearchGrid = ({ onNavigateToSection, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeQuery, setActiveQuery] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    setActiveQuery(term.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setActiveQuery(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setActiveQuery('');
  };

  // Filter search index
  const filteredResults = useMemo(() => {
    if (!activeQuery) return [];

    const lower = activeQuery.toLowerCase();
    const queryWords = lower.split(/\s+/).filter(Boolean);

    return searchIndex.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(lower);
      const matchSnippet = item.snippet.toLowerCase().includes(lower);
      const matchSection = item.section.toLowerCase().includes(lower);
      const matchKeywords = item.keywords.some((kw) =>
        queryWords.some((w) => kw.toLowerCase().includes(w))
      );

      return matchTitle || matchSnippet || matchSection || matchKeywords;
    });
  }, [activeQuery]);

  const handleItemClick = (sectionId) => {
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to highlight matching text
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={i}
          style={{
            backgroundColor: 'rgba(236, 72, 153, 0.35)',
            color: '#fff',
            padding: '1px 3px',
            borderRadius: '3px',
          }}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div style={styles.container}>
      {/* Top Header Bar */}
      <div style={styles.header}>
        {onBack && (
          <button
            onClick={onBack}
            style={styles.backBtn}
            aria-label="Back to portfolio"
          >
            <FaArrowLeft size={18} />
          </button>
        )}
        <div style={styles.searchBoxWrapper}>
          <FaSearch size={16} color="#9ca3af" style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search: React, Infosys, Blood, DSA, Skills..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
            autoFocus
            aria-label="Search portfolio"
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              style={styles.clearBtn}
              aria-label="Clear search"
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>
        <button
          onClick={() => setActiveQuery(searchTerm.trim())}
          style={styles.searchSubmitBtn}
        >
          Search
        </button>
      </div>

      {/* Popular Query Tags */}
      <div style={styles.popularTagsWrapper}>
        <span style={styles.popularLabel}>Popular searches:</span>
        <div style={styles.tagsRow}>
          {popularKeywords.map((tag) => (
            <button
              key={tag}
              onClick={() => handleSearch(tag)}
              style={{
                ...styles.tagBtn,
                backgroundColor:
                  activeQuery.toLowerCase() === tag.toLowerCase()
                    ? '#ec4899'
                    : '#27272a',
                color: '#fff',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main Results Area */}
      <div style={styles.contentArea}>
        {activeQuery ? (
          filteredResults.length > 0 ? (
            <div>
              <div style={styles.resultsCountBar}>
                <span>
                  Found <strong>{filteredResults.length}</strong> matching result
                  {filteredResults.length === 1 ? '' : 's'} for "{activeQuery}"
                </span>
              </div>

              <div style={styles.resultsGrid}>
                {filteredResults.map((item) => {
                  const badgeColor = categoryColors[item.section] || '#6366f1';
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item.sectionId)}
                      style={styles.resultCard}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleItemClick(item.sectionId);
                        }
                      }}
                    >
                      <div style={styles.cardTopRow}>
                        <span
                          style={{
                            ...styles.categoryPill,
                            backgroundColor: `${badgeColor}20`,
                            borderColor: `${badgeColor}60`,
                            color: badgeColor,
                          }}
                        >
                          {item.section}
                        </span>
                        <FaExternalLinkAlt size={12} color="#9ca3af" />
                      </div>

                      <h3 style={styles.cardTitle}>
                        {highlightMatch(item.title, activeQuery)}
                      </h3>

                      <p style={styles.cardSnippet}>
                        {highlightMatch(item.snippet, activeQuery)}
                      </p>

                      <div style={styles.cardFooter}>
                        <span style={styles.viewSectionText}>
                          Jump to {item.section} Section →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* No Results Found State */
            <div style={styles.noResultsBox}>
              <div style={styles.noResultsIconCircle}>
                <FaSearch size={32} color="#ec4899" />
              </div>
              <h2 style={styles.noResultsTitle}>No results found</h2>
              <p style={styles.noResultsDesc}>
                We couldn't find anything matching "<strong>{activeQuery}</strong>".
              </p>
              <p style={styles.noResultsSub}>
                Try searching for technologies (e.g. <em>React</em>, <em>Node.js</em>, <em>C++</em>), projects (e.g. <em>Blood</em>, <em>CodePen</em>), experience (e.g. <em>Infosys</em>, <em>Mentor</em>), or skills (e.g. <em>DSA</em>).
              </p>
              <button onClick={handleClear} style={styles.resetBtn}>
                Clear Search & View All
              </button>
            </div>
          )
        ) : (
          /* Initial State: Section Directory */
          <div style={styles.browseSection}>
            <div style={styles.browseHeader}>
              <FaCompass size={20} color="#ec4899" />
              <h2 style={styles.browseTitle}>Explore Portfolio Sections</h2>
            </div>
            <p style={styles.browseSubtitle}>
              Type any keyword above or choose a section below to navigate directly:
            </p>

            <div style={styles.sectionsDirectoryGrid}>
              {searchIndex.map((item) => {
                const badgeColor = categoryColors[item.section] || '#6366f1';
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item.sectionId)}
                    style={styles.directoryCard}
                  >
                    <span
                      style={{
                        ...styles.categoryPill,
                        backgroundColor: `${badgeColor}20`,
                        borderColor: `${badgeColor}60`,
                        color: badgeColor,
                      }}
                    >
                      {item.section}
                    </span>
                    <h4 style={styles.directoryCardTitle}>{item.title}</h4>
                    <p style={styles.directoryCardSnippet}>{item.snippet}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#000',
    color: '#fff',
    padding: '1.5rem 1rem 6rem',
    maxWidth: '850px',
    margin: '0 auto',
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  backBtn: {
    background: '#18181b',
    border: '1px solid #27272a',
    color: '#fff',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
  },
  searchBoxWrapper: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '0.85rem 2.8rem 0.85rem 2.8rem',
    backgroundColor: '#18181b',
    border: '1.5px solid #3f3f46',
    borderRadius: '9999px',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  clearBtn: {
    position: 'absolute',
    right: '14px',
    background: '#3f3f46',
    border: 'none',
    color: '#fff',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  searchSubmitBtn: {
    padding: '0.75rem 1.25rem',
    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
    color: '#fff',
    border: 'none',
    borderRadius: '9999px',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    flexShrink: 0,
  },
  popularTagsWrapper: {
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  popularLabel: {
    fontSize: '12px',
    color: '#a1a1aa',
  },
  tagsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  tagBtn: {
    border: '1px solid #3f3f46',
    borderRadius: '9999px',
    padding: '4px 12px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  contentArea: {
    marginTop: '1rem',
  },
  resultsCountBar: {
    fontSize: '14px',
    color: '#a1a1aa',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #27272a',
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem',
  },
  resultCard: {
    backgroundColor: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '12px',
    padding: '1.2rem',
    cursor: 'pointer',
    transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.6rem',
  },
  categoryPill: {
    fontSize: '11px',
    fontWeight: '600',
    padding: '3px 8px',
    borderRadius: '6px',
    borderWidth: '1px',
    borderStyle: 'solid',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  cardTitle: {
    fontSize: '1.05rem',
    fontWeight: '600',
    color: '#fafafa',
    margin: '0 0 0.5rem',
    lineHeight: '1.4',
  },
  cardSnippet: {
    fontSize: '0.86rem',
    color: '#a1a1aa',
    lineHeight: '1.5',
    margin: '0 0 1rem',
  },
  cardFooter: {
    marginTop: 'auto',
    paddingTop: '0.5rem',
    borderTop: '1px solid #27272a',
  },
  viewSectionText: {
    fontSize: '12px',
    color: '#818cf8',
    fontWeight: '600',
  },
  noResultsBox: {
    textAlign: 'center',
    padding: '3rem 1.5rem',
    backgroundColor: '#18181b',
    borderRadius: '16px',
    border: '1px dashed #3f3f46',
  },
  noResultsIconCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.2rem',
  },
  noResultsTitle: {
    fontSize: '1.4rem',
    color: '#fff',
    marginBottom: '0.5rem',
  },
  noResultsDesc: {
    fontSize: '0.95rem',
    color: '#d4d4d8',
    marginBottom: '0.5rem',
  },
  noResultsSub: {
    fontSize: '0.85rem',
    color: '#71717a',
    maxWidth: '450px',
    margin: '0 auto 1.5rem',
    lineHeight: '1.5',
  },
  resetBtn: {
    padding: '0.65rem 1.3rem',
    backgroundColor: '#ec4899',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  browseSection: {
    marginTop: '1rem',
  },
  browseHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '0.3rem',
  },
  browseTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#fff',
    margin: 0,
  },
  browseSubtitle: {
    fontSize: '0.85rem',
    color: '#a1a1aa',
    marginBottom: '1.2rem',
  },
  sectionsDirectoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '0.9rem',
  },
  directoryCard: {
    backgroundColor: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '10px',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
  },
  directoryCardTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#e4e4e7',
    margin: '0.5rem 0 0.3rem',
  },
  directoryCardSnippet: {
    fontSize: '0.8rem',
    color: '#71717a',
    lineHeight: '1.4',
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
};

export default SearchGrid;
