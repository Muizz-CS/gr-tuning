export default function ToggleButton({ isEcoMode, setIsEcoMode }) {
  return (
    <div className="mode-toggle" aria-label="Tuning focus">
      <button
        type="button"
        onClick={() => setIsEcoMode(true)}
        className={`mode-toggle__btn ${isEcoMode ? 'mode-toggle__btn--eco-active' : ''}`}
      >
        Eco / Fleet
      </button>

      <button
        type="button"
        onClick={() => setIsEcoMode(false)}
        className={`mode-toggle__btn ${!isEcoMode ? 'mode-toggle__btn--perf-active' : ''}`}
      >
        Performance
      </button>
    </div>
  );
}
