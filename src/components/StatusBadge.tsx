interface StatusBadgeProps {
  status: string;
  variant?: "success" | "warning" | "destructive" | "info" | "default";
}

const variantStyles: Record<string, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
  info: "bg-info/10 text-info",
  default: "bg-muted text-muted-foreground",
};

export default function StatusBadge({ status, variant = "default" }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]}`}>
      {status}
    </span>
  );
}
