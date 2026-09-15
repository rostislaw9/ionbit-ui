import {
  Card,
  Button,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  toast,
} from "@ionbit-ui/ui";
export function LoginCard() {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="showcase-email">Email</Label>
          <Input
            id="showcase-email"
            type="email"
            placeholder="you@example.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="showcase-password">Password</Label>
          <Input
            id="showcase-password"
            type="password"
            placeholder="••••••••"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-2">
          <Checkbox id="showcase-remember" defaultChecked />
          <Label htmlFor="showcase-remember" className="text-sm">
            Remember me
          </Label>
        </div>
        <Button
          variant="primary"
          className="w-full"
          onClick={() => toast.success("Signed in")}
        >
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
}
