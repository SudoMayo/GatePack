import { Check } from 'lucide-react';

interface Step {
  label: string;
  status: 'done' | 'active' | 'pending';
  statusText: string;
}

interface VerticalStepperProps {
  steps: Step[];
}

export function VerticalStepper({ steps }: VerticalStepperProps) {
  return (
    <ol className="v-stepper" aria-label="Package progress">
      {steps.map((step) => (
        <li
          key={step.label}
          className="v-stepper__step"
          aria-current={step.status === 'active' ? 'step' : undefined}
        >
          <div
            className={`v-stepper__node v-stepper__node--${step.status}`}
            aria-hidden
          >
            {step.status === 'done' && (
              <Check size={14} strokeWidth={3} color="var(--ink)" />
            )}
          </div>
          <div className="v-stepper__content">
            <div className="v-stepper__title">{step.label}</div>
            <div className="v-stepper__status">{step.statusText}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
