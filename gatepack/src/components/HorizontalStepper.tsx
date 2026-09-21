interface HorizontalStepperProps {
  steps: string[];
  completedCount: number;
}

export function HorizontalStepper({ steps, completedCount }: HorizontalStepperProps) {
  return (
    <div className="h-stepper" aria-label="Parcel progress">
      <div className="h-stepper__line" aria-hidden />
      {steps.map((label, i) => (
        <div key={label} className="h-stepper__step">
          <div
            className={`h-stepper__node${i >= completedCount ? ' h-stepper__node--empty' : ''}`}
            aria-hidden
          />
          <span className="h-stepper__label">{label}</span>
        </div>
      ))}
    </div>
  );
}
