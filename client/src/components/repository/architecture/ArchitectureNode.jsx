import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import {
  getFileIcon,
  getFileTypeLabel,
  getNodeColorScheme,
} from './nodeColors';

/**
 * Professional custom node component for architecture visualization
 * Inspired by Linear, Vercel, and GitHub's design systems
 * 
 * Features:
 * - Dynamic colors based on file type
 * - Animated hover states with glow effect
 * - Import/export statistics
 * - Premium typography and spacing
 * - Extensible for future badges and metadata
 */
function ArchitectureNode({ data, selected }) {
  const { label, imports = 0, importedBy = 0, totalConnections = 0 } = data;
  
  const icon = getFileIcon(label);
  const fileType = getFileTypeLabel(label);
  const colors = getNodeColorScheme(label);

  return (
    <div className="group relative">
      {/* Top Handle - for incoming connections */}
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2.5 !w-2.5 !border-2 !transition-all !duration-200"
        style={{
          borderColor: colors.border,
          backgroundColor: 'rgb(15, 23, 42)',
          top: -6,
        }}
      />

      {/* Bottom Handle - for outgoing connections */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2.5 !w-2.5 !border-2 !transition-all !duration-200"
        style={{
          borderColor: colors.border,
          backgroundColor: 'rgb(15, 23, 42)',
          bottom: -6,
        }}
      />

      {/* Main Node Container */}
      <div
        className="relative overflow-hidden rounded-xl border-2 shadow-xl backdrop-blur-sm transition-all duration-300 ease-out group-hover:scale-[1.05] group-hover:shadow-2xl"
        style={{
          minWidth: '200px',
          maxWidth: '280px',
          backgroundColor: 'rgb(15, 23, 42)',
          borderColor: selected ? colors.borderHover : colors.border,
          boxShadow: selected
            ? `0 0 0 3px ${colors.glow}, 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)`
            : '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Animated Border Glow on Hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${colors.glow} 0%, transparent 50%, ${colors.glow} 100%)`,
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 3s ease infinite',
          }}
        />

        {/* Header Section */}
        <div
          className="relative border-b px-3.5 py-3 transition-colors duration-200"
          style={{
            borderColor: 'rgba(71, 85, 105, 0.3)',
            backgroundColor: colors.background,
          }}
        >
          <div className="flex items-start gap-2.5">
            {/* File Icon */}
            <span
              className="text-2xl leading-none transition-transform duration-200 group-hover:scale-110"
              style={{ marginTop: '1px' }}
            >
              {icon}
            </span>

            {/* Filename */}
            <div className="min-w-0 flex-1">
              <p
                className="truncate font-mono text-sm font-semibold leading-tight tracking-tight text-white transition-colors duration-200"
                title={label}
                style={{
                  textShadow: selected ? `0 0 8px ${colors.glow}` : 'none',
                }}
              >
                {label}
              </p>
            </div>
          </div>
        </div>

        {/* Body Section */}
        <div className="relative space-y-2.5 px-3.5 py-3">
          {/* File Type Badge */}
          <div
            className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium transition-all duration-200"
            style={{
              backgroundColor: colors.badge,
              color: colors.text,
              border: `1px solid ${colors.border}50`,
            }}
          >
            {fileType}
          </div>

          {/* Dependency Statistics */}
          {totalConnections > 0 && (
            <div className="space-y-1.5 text-xs">
              {/* Imports */}
              {imports > 0 && (
                <div className="flex items-center gap-1.5 text-slate-400">
                  <svg
                    className="h-3.5 w-3.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                  <span>
                    {imports} {imports === 1 ? 'import' : 'imports'}
                  </span>
                </div>
              )}

              {/* Imported By */}
              {importedBy > 0 && (
                <div className="flex items-center gap-1.5 text-slate-400">
                  <svg
                    className="h-3.5 w-3.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span>
                    {importedBy} {importedBy === 1 ? 'dependent' : 'dependents'}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Subtle Background Gradient */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at top right, ${colors.background}, transparent 60%)`,
          }}
        />
      </div>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders when parent updates
export default memo(ArchitectureNode);
