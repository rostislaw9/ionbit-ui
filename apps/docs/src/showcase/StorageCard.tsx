import {
  Card,
  Button,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress,
  Separator,
  Switch,
} from "@ionbit-ui/ui";
export function StorageCard() {
  const storage = 42;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Storage</CardTitle>
        <CardDescription>{storage}% of 100 GB used</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Progress value={storage} />
        <div className="flex items-center justify-between text-xs text-foreground-subtle">
          <span>{storage} GB used</span>
          <span>{100 - storage} GB free</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground-muted">Auto-cleanup</span>
          <Switch defaultChecked />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full">
          Upgrade storage
        </Button>
      </CardFooter>
    </Card>
  );
}
