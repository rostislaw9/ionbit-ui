import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";

export function ProgressLabelDemo() {
  return (
    <Progress value={56} className="w-full max-w-sm">
      <div className="flex items-center justify-between">
        <ProgressLabel>Upload progress</ProgressLabel>
        <ProgressValue />
      </div>
    </Progress>
  );
}
