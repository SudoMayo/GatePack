interface OtpBoxesProps {
  digits: string;
  expired?: boolean;
}

export function OtpBoxes({ digits, expired }: OtpBoxesProps) {
  const chars = digits.split('');
  const label = `OTP: ${chars.join(', ')}`;

  return (
    <div
      className={`otp-boxes${expired ? ' otp-boxes--expired' : ''}`}
      role="img"
      aria-label={label}
    >
      {chars.map((d, i) => (
        <span key={i} className="otp-boxes__digit" aria-hidden>
          {expired ? '–' : d}
        </span>
      ))}
    </div>
  );
}
