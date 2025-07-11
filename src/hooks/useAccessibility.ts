import { useRef, useCallback } from 'react';

export const useFocusManagement = () => {
  const focusRef = useRef<HTMLElement | null>(null);

  const focusElement = useCallback((element: HTMLElement | null) => {
    if (element) {
      element.focus();
      focusRef.current = element;
    }
  }, []);

  const focusFirstFocusable = useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      const firstElement = focusableElements[0] as HTMLElement;
      focusElement(firstElement);
    }
  }, [focusElement]);

  const focusLastFocusable = useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      focusElement(lastElement);
    }
  }, [focusElement]);

  const trapFocus = useCallback((container: HTMLElement, event: KeyboardEvent) => {
    const focusableElements = Array.from(
      container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement;

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift + Tab
        if (activeElement === firstElement) {
          event.preventDefault();
          focusElement(lastElement);
        }
      } else {
        // Tab
        if (activeElement === lastElement) {
          event.preventDefault();
          focusElement(firstElement);
        }
      }
    }
  }, [focusElement]);

  return {
    focusRef,
    focusElement,
    focusFirstFocusable,
    focusLastFocusable,
    trapFocus,
  };
};

export const useKeyboardNavigation = () => {
  const handleEscape = useCallback((callback: () => void) => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleArrowKeys = useCallback((
    onUp?: () => void,
    onDown?: () => void,
    onLeft?: () => void,
    onRight?: () => void
  ) => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          onUp?.();
          break;
        case 'ArrowDown':
          event.preventDefault();
          onDown?.();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          onLeft?.();
          break;
        case 'ArrowRight':
          event.preventDefault();
          onRight?.();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    handleEscape,
    handleArrowKeys,
  };
};

export const useAriaAttributes = () => {
  const getMenuProps = useCallback((isOpen: boolean, id: string) => ({
    role: 'menu',
    'aria-expanded': isOpen,
    'aria-labelledby': id,
  }), []);

  const getMenuItemProps = useCallback((index: number, total: number) => ({
    role: 'menuitem',
    tabIndex: -1,
    'aria-setsize': total,
    'aria-posinset': index + 1,
  }), []);

  const getDialogProps = useCallback((titleId: string, descriptionId?: string) => ({
    role: 'dialog',
    'aria-modal': true,
    'aria-labelledby': titleId,
    ...(descriptionId && { 'aria-describedby': descriptionId }),
  }), []);

  const getTabProps = useCallback((index: number, isSelected: boolean, total: number) => ({
    role: 'tab',
    'aria-selected': isSelected,
    'aria-setsize': total,
    'aria-posinset': index + 1,
    tabIndex: isSelected ? 0 : -1,
  }), []);

  const getTabPanelProps = useCallback((index: number, isSelected: boolean) => ({
    role: 'tabpanel',
    'aria-hidden': !isSelected,
    tabIndex: isSelected ? 0 : -1,
  }), []);

  return {
    getMenuProps,
    getMenuItemProps,
    getDialogProps,
    getTabProps,
    getTabPanelProps,
  };
};

export const useScreenReaderAnnouncement = () => {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    
    // Use setTimeout to ensure the element is in the DOM
    setTimeout(() => {
      announcement.textContent = message;
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }, 100);
  }, []);

  return { announce };
}; 