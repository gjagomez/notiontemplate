import React from 'react';
import { Block } from '../types';

interface EditableBlockProps {
  block: Block;
  onContentChange: (blockId: string, content: string) => void;
  onKeyDown: (e: React.KeyboardEvent, blockId: string, parentBlockId?: string) => void;
  onToggleCheck?: (checked: boolean) => void;
  onUpdateBlock: (updates: Partial<Block>) => void;
}

const EditableBlock: React.FC<EditableBlockProps> = ({
  block,
  onContentChange,
  onKeyDown,
  onToggleCheck,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onContentChange(block.id, e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    onKeyDown(e, block.id, block.parentBlockId);
  };

  const renderTextBlock = () => (
    <input
      type="text"
      value={block.content}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Escribe '/' para comandos"
      className="w-full bg-transparent border-none outline-none text-app-text placeholder:text-app-text-secondary text-base leading-relaxed"
    />
  );

  const renderHeadingBlock = () => (
    <input
      type="text"
      value={block.content}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Encabezado"
      className="w-full bg-transparent border-none outline-none text-app-text placeholder:text-app-text-secondary text-4xl font-bold leading-tight"
    />
  );
  
  const renderBriefBlock = () => (
    <input
      type="text"
      value={block.content}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Brief"
      className="w-full bg-transparent border-none outline-none text-app-text placeholder:text-app-text-secondary text-2xl font-semibold leading-tight"
    />
  );

  const renderTodoBlock = () => (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => onToggleCheck?.(!block.checked)}
        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
          block.checked ? 'border-app-accent bg-app-accent' : 'border-gray-400'
        }`}
      />
      <input
        type="text"
        value={block.content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Elemento de la lista"
        className={`w-full bg-transparent border-none outline-none placeholder:text-app-text-secondary text-base leading-relaxed ${
          block.checked ? 'text-app-text-secondary line-through' : 'text-app-text'
        }`}
      />
    </div>
  );

  const renderBlock = () => {
    switch (block.type) {
      case 'heading': return renderHeadingBlock();
      case 'todo': return renderTodoBlock();
      case 'brief': return renderBriefBlock();
      default: return renderTextBlock();
    }
  };

  return (
    <div id={`block-${block.id}`} className="group relative py-1">
      {renderBlock()}
    </div>
  );
};

export default EditableBlock;
