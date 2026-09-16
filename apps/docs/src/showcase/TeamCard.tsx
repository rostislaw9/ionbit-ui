import {
  Card,
  Avatar,
  AvatarFallback,
  Badge,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ionbit-ui/ui";
export function TeamCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team</CardTitle>
        <CardDescription>5 members in your workspace.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {[
          { name: "MK", role: "Owner" },
          { name: "JS", role: "Admin" },
          { name: "AB", role: "Editor" },
          { name: "RD", role: "Viewer" },
          { name: "LM", role: "Viewer" },
        ].map((member, i) => (
          <div key={i} className="flex items-center gap-3">
            <Avatar size="sm">
              <AvatarFallback>{member.name}</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col">
              <span className="text-sm text-foreground">
                User {member.name}
              </span>
              <span className="text-xs text-foreground-subtle">
                {member.role}
              </span>
            </div>
            <Badge variant={member.role === "Owner" ? "accent" : "default"}>
              {member.role}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
