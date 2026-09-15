import {
  Card,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ionbit-ui/ui";
export function ProfileCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Your public identity.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3 py-4">
        <Avatar className="size-16">
          <AvatarFallback>IB</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-semibold text-foreground">
            Ionbit User
          </span>
          <span className="text-xs text-foreground-muted">
            developer@ionbit.ui
          </span>
        </div>
        <Badge variant="accent">Pro</Badge>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Edit profile
        </Button>
      </CardFooter>
    </Card>
  );
}
