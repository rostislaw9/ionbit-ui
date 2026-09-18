import {
  Bell,
  CreditCard,
  Download,
  Eye,
  FileCode,
  FilePlus2,
  Folder,
  FolderOpen,
  FolderSearch,
  HelpCircle,
  Keyboard,
  Languages,
  LayoutPanelLeft,
  LogOut,
  Mail,
  Monitor,
  Moon,
  MoreHorizontal,
  Palette,
  Rocket,
  Save,
  Settings,
  Shield,
  Sun,
  User,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuComplexDemo() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
  });
  const [showSidebar, setShowSidebar] = useState(true);
  const [showStatusBar, setShowStatusBar] = useState(false);
  const [theme, setTheme] = useState("system");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="secondary" />}>
        Complex Menu
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Project</DropdownMenuLabel>
          <DropdownMenuItem>
            <FilePlus2 />
            New project
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Folder />
            New environment
            <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FolderOpen />
              Open recent
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Recent projects</DropdownMenuLabel>
                <DropdownMenuItem>
                  <FileCode />
                  storefront-web
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileCode />
                  api-gateway
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <MoreHorizontal />
                    More projects
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <FileCode />
                      billing-service
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileCode />
                      docs-site
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <FolderSearch />
                  Browse all…
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Save />
            Save
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download />
            Export
            <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>View</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={showSidebar}
            onCheckedChange={setShowSidebar}
          >
            <Eye />
            Show sidebar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            <LayoutPanelLeft />
            Show status bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Palette />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light">
                    <Sun />
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    <Moon />
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    <Monitor />
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <User />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Settings />
              Settings
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Keyboard />
                  Keyboard shortcuts
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Languages />
                  Language
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Bell />
                    Notifications
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Channels</DropdownMenuLabel>
                      <DropdownMenuCheckboxItem
                        checked={notifications.push}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            push: checked === true,
                          })
                        }
                      >
                        <Bell />
                        Push
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={notifications.email}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            email: checked === true,
                          })
                        }
                      >
                        <Mail />
                        Email
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Shield />
                  Privacy & security
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <HelpCircle />
            Help & support
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Rocket />
            Deploy docs
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <LogOut />
            Sign out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
