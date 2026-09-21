interface PackageRowProps {
  value: string;
}

export function PackageRow({ value }: PackageRowProps) {
  return (
    <div className="package-row">
      <div className="package-row__label">Package</div>
      <div className="package-row__value">{value}</div>
    </div>
  );
}
