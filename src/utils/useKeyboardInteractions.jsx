const useKeyboardInteractions = () => {
  const preventScrollOnKeyDown = (e) => {
    if (e.key === 'Space' || e.keyCode === 32) {
      e.preventDefault();
    }
  };

  const performActionOnEnterOrSpace = (e, callback) => {
    if (!callback) return;
    if (e.key === 'Enter' || e.key === 'Space' || e.keyCode === 32 || e.keyCode === 13) {
      callback();
    }
  };

  const performActionOnEnter = (e, callback) => {
    if (!callback) return;
    if (e.key === 'Enter' || e.keyCode === 13) {
      callback();
    }
  };

  const performActionOnDownArrowKey = (e, callback) => {
    if (!callback) return;
    if (e.key === 'ArrowDown' || e.keyCode === 40) {
      callback();
    }
  };

  return {
    performActionOnDownArrowKey,
    performActionOnEnter,
    performActionOnEnterOrSpace,
    preventScrollOnKeyDown,
  };
};

export default useKeyboardInteractions;
